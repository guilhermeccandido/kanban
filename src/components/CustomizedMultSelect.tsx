import useBackupState from "@/hooks/useBackupState";
import useClickOutSide from "@/hooks/useClickOutSide";
import { cn } from "@/lib/utils";
import { CircleX, X } from "lucide-react";
import {
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
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
  const selectorRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleOnClose = useCallback(() => {
    setOpen(false);
    setSearchValue("");
    resetOptions();
    setIsNewLabel(false);
  }, [resetOptions]);
  useClickOutSide(selectorRef, handleOnClose);

  useEffect(() => {
    if (!lazyFetch) return;
    lazyFetch()
      .then((data) => {
        setPrivateOptionsBackup(data);
      })
      .catch((error) => {
        console.error(error);
        setPrivateOptionsBackup([]);
      });
  }, [lazyFetch, setPrivateOptionsBackup]);

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
    if (onChange) onChange([]);
  };

  const onSelect = (option: string) => {
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
    <div className="relative text-sm text-left">
      <div
        className="relative w-full bg-background border rounded-lg"
        ref={selectorRef}
      >
        <div
          onClick={handleOpen}
          className="py-2 px-4 flex justify-between items-center cursor-pointer"
        >
          <div className="flex flex-wrap justify-start">
            {privateValue.length > 0 ? (
              <>
                {privateValue.map((value) => (
                  <div
                    key={value}
                    className="inline-flex bg-gray-200 max-w-[180px] m-[1px] items-center"
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap px-1">
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
              <div className="inline-flex max-w-full ml-1">
                <input
                  ref={searchRef}
                  onChange={onSearch}
                  value={searchValue}
                  className="outline-none border-none bg-transparent w-full"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleInputOnKeyDown}
                />
              </div>
            )}
          </div>
          <div>
            <CircleX className="w-4 h-4 ml-1" onClick={clearSelected} />
          </div>
        </div>
        {open && privateOptions.length > 0 && (
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
                <div className="break-words">{option}</div>{" "}
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
