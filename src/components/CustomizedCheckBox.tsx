import { cn } from '@/lib/utils';
import { AxiosResponse } from 'axios';
import { Check } from 'lucide-react';
import { FC, useState } from 'react';

type CheckBoxProps = {
	classname?: string;
	onChange?: (value: boolean) => Response | Promise<Response | AxiosResponse>;
    onSuccess?: () => void;
	async?: boolean;
	defaultChecked?: boolean;
};

const CheckBox: FC<CheckBoxProps> = ({
	classname,
	onChange,
	onSuccess,
	async,
	defaultChecked,
}) => {
	const [checked, setChecked] = useState(defaultChecked || false);

	const handleOnClick = async () => {
		setChecked(!checked);

		if (async && onChange) {
			const respone = await onChange(!checked);
			if (respone.status !== 200) {
				setChecked(!checked);
			} else {
                onSuccess && onSuccess();
            }
		}
	};

	return (
		<div
			className={cn(
				'w-5 h-5 border border-gray-400 rounded-md mr-2',
				classname
			)}
			onClick={handleOnClick}
		>
			{checked && <Check className='relative w-4 h-4 left-[1px] top-[1px]' />}
		</div>
	);
};

export default CheckBox;
