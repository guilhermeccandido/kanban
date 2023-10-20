'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import CustomizedDialog from '../CustomizedDialog';
import TaskCreatorForm from './TaskCreatorForm';

type Point = {
	x: number;
	y: number;
};

const TaskCreator = ({}) => {
	const [open, setOpen] = useState(false);

	const handleOpenDialog = (e: React.MouseEvent<HTMLDivElement>) => {
		setOpen(true);
	};

	const handleOnClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div
				className='absolute left-1/2 -translate-x-1/2 w-11/12 h-10 bg-white bottom-6 rounded-xl shadow-lg flex items-center p-2 text-foreground hover:bg-zinc-100 cursor-pointer'
				onClick={handleOpenDialog}
			>
				<Plus color='#808080' />
			</div>
			<CustomizedDialog open={open} onClose={handleOnClose}>
                <TaskCreatorForm handleOnSuccess={handleOnClose} />
			</CustomizedDialog>
		</>
	);
};

export default TaskCreator;
