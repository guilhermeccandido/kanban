import { FC, useEffect, useRef } from "react";

type CustomizedDialogProps = {
  children?: JSX.Element;
  open: boolean;
  onClose?: () => void;
};

const CustomizedDialog: FC<CustomizedDialogProps> = ({
  open,
  children,
  onClose = () => {},
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="absolute w-screen h-screen z-10 bg-zinc-500/30 backdrop-blur-[1px] inset-0" />
      <div
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-[50%] w-[540px] rounded-xl shadow-lg z-20 bg-white h-fit"
        ref={dialogRef}
      >
        {children}
      </div>
    </>
  );
};

export default CustomizedDialog;
