import useBreakpoint from '@/hooks/useBreakpoint';
import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';

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
	const { md } = useBreakpoint();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dialogRef.current &&
				!dialogRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<>
			<div className='absolute w-screen h-screen z-10 bg-zinc-500/30 backdrop-blur-[1px] inset-0' />
			<div
				className={clsx(
					'absolute inset-1/2 -translate-x-1/2 -translate-y-[50%] rounded-xl shadow-lg z-20 bg-white h-fit',
					typeof md === 'undefined' || md ? 'w-[500px]' : 'w-[90%]'
				)}
				ref={dialogRef}
			>
				{children}
			</div>
		</>
	);
};

export default CustomizedDialog;
