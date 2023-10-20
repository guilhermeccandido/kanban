import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type Option = {
	value: string;
	title: string;
	render?: JSX.Element | null;
};

type CustomizedSelectProps = {
	options: Option[];
	register: UseFormRegisterReturn;
};

const CustomizedSelect: FC<CustomizedSelectProps> = ({ options, register }) => {
	return (
		<select {...register}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.title}
				</option>
			))}
		</select>
	);
};

export default CustomizedSelect;
