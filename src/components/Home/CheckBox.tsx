import { cn } from "@/lib/utils";
import { FC } from "react";

type CheckBoxProps = {
    classname?: string;
};

const CheckBox:FC<CheckBoxProps> = ({classname}) => {
	return <div className={cn('w-5 h-5 border border-gray-400 rounded-md mr-2', classname)}></div>;
};

export default CheckBox;
