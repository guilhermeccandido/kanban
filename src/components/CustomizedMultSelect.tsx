import useBackupState from "@/hooks/useBackupState";
import useClickOutSide from "@/hooks/useClickOutSide";
import useEsc from "@/hooks/useEsc";
import { throttle } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Check, CircleX, X } from "lucide-react";
import {
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CustomizedMultSelectProps = {
  options?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  lazyFetch?: () => Promise<string[]>;
};

const CustomizedMultSelect: FC<CustomizedMultSelectProps> = ({
  options = [],
  value = [],
  onChange,
  placeholder,
  lazyFetch,
}) => {
  const [privateValue, setPrivateValue] = useState<string[]>(value);
  const {
    state: privateOptions,
    setState: setPrivateOptions,
    setBackupState: setPrivateOptionsBackup,
    backupState: privateOptionsBackup,
    reset: resetOptions,
  } = useBackupState({ initialState: options });
  const [isNewLabel, setIsNewLabel] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleOnClose = useCallback(() => {
    setOpen(false);
    setSearchValue("");
    resetOptions();
    setIsNewLabel(false);
  }, [resetOptions]);
  useClickOutSide(selectorRef, handleOnClose);
  useEsc(handleOnClose);

  const throttledFetchLabels = useMemo(
    () =>
      throttle(async () => {
        if (!lazyFetch) return;
        const data = await lazyFetch();
        setPrivateOptionsBackup(data ?? []);
        setFetched(true);
      }, 500),
    [lazyFetch, setPrivateOptionsBackup],
  );

  useEffect(() => {
    if (open && lazyFetch && !fetched) {
      throttledFetchLabels();
    }
  }, [open, lazyFetch, fetched, throttledFetchLabels]);

  useEffect(() => {
    if (!open || !searchRef.current) return;
    searchRef.current.focus();
  }, [open]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const clearSelected = () => {
    setPrivateValue([]);
    setIsNewLabel(false);
    setSearchValue("");
    if (onChange) onChange([]);
  };

  const onSelect = (option: string) => {
    setSearchValue("");
    const newValue = privateValue.includes(option)
      ? privateValue.filter((value) => value !== option)
      : [...privateValue, option];
    setPrivateValue(newValue);
    resetOptions();
    if (onChange) onChange(newValue);
  };

  const removeSelected = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    onSelect(option);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      resetOptions();
      setIsNewLabel(false);
    }

    const filteredOptions = privateOptionsBackup.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredOptions.length > 0) {
      setPrivateOptions(filteredOptions);
      setIsNewLabel(false);
      return;
    }
    setPrivateOptions([value]);
    setIsNewLabel(true);
  };

  const handleInputOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();

    const key = e.key;
    switch (key) {
      case "Enter":
        handleEnterKeyDown(e);
        break;
      case "Backspace":
        handleBackspaceKeyDown(e);
        break;
      case "Escape":
        handleOnClose();
        break;
      default:
        break;
    }
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue("");
    const newOption = searchValue.trim();
    if (!newOption) return;

    if (isNewLabel) {
      setPrivateOptionsBackup((prev) => [...prev, newOption]);
      onSelect(newOption);
      setIsNewLabel(false);
      return;
    }

    onSelect(searchValue);
  };

  const handleBackspaceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchValue.length > 0 || privateValue.length === 0) return;
    e.preventDefault();

    const lastValue = privateValue[privateValue.length - 1];
    if (lastValue) {
      onSelect(lastValue);
    }
  };

  return (
    <div className="relative text-sm text-left max-w-full">
      <div
        className="relative bg-background border rounded-lg"
        ref={selectorRef}
      >
        <div
          onClick={handleOpen}
          className="py-2 px-4 flex justify-between items-center cursor-pointer max-w-full"
        >
          <div className="flex flex-wrap justify-start max-w-full">
            {privateValue.length > 0 ? (
              <>
                {privateValue.map((value) => (
                  <div
                    key={value}
                    className="inline-flex bg-slate-200 max-w-[180px] m-[1px] items-center rounded-sm"
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap px-2">
                      {value}
                    </div>
                    {open && (
                      <div
                        className="w-5 h-5 cursor-pointer p-1 hover:bg-rose-300"
                        onClick={(e) => removeSelected(e, value)}
                      >
                        <X className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              !open && (
                <span className="text-muted-foreground">{placeholder}</span>
              )
            )}
            {open && (
              <div className="inline-flex grow min-w-[20px] max-w-full ml-1 overflow-hidden">
                <input
                  ref={searchRef}
                  onChange={onSearch}
                  value={searchValue}
                  className="w-full min-w-0 outline-none border-none bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleInputOnKeyDown}
                />
              </div>
            )}
          </div>
          <div>
            {!fetched && open ? (
              <div className="w-4 h-4 ml-1 flex justify-center items-center">
                <div className="w-4 h-4 border-2 border-t-zinc-500 border-solid rounded-full animate-spin" />
              </div>
            ) : (
              <CircleX className="w-4 h-4 ml-1" onClick={clearSelected} />
            )}
          </div>
        </div>
        {open && privateOptions?.length > 0 && (
          <div className="absolute bg-white my-1 w-full border rounder-md z-50">
            {privateOptions.map((option) => (
              <div
                key={option}
                className={cn(
                  "py-2 px-4 cursor-pointer hover:bg-gray-200",
                  privateValue.includes(option) && "bg-accent",
                )}
                onClick={() => onSelect(option)}
              >
                <div className="break-words">
                  {option}
                  {privateValue.includes(option) && (
                    <Check className="w-4 h-4 inline-block ml-2" />
                  )}
                </div>{" "}
                <span>
                  {isNewLabel && (
                    <span className="text-muted-foreground">(new label)</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizedMultSelect;
