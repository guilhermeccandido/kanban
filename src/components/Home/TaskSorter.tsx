'use client';

import { ArrowUpDown, Link } from 'lucide-react';
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { sortTodoBy } from '@/redux/actions/todoAction';
import { TodoState } from '@/redux/reducers/todoReducer';

const TaskSorter = () => {
	const dispatch = useDispatch();

	const handleModifySort = (sortBy: TodoState['sortedBy']) => {
		dispatch(sortTodoBy(sortBy));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className='flex text-slate-300 cursor-pointer align-middle'>
					<ArrowUpDown size={20} />
					<span className='pl-1'>Sort</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white' align='end'>
				<div className='text-md text-center p-2'>Sort by</div>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					asChild
					className='px-4 py-2'
					onClick={() => handleModifySort('priority')}
				>
					<div>Priority</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					asChild
					className='px-4 py-2'
					onClick={() => handleModifySort('dueDate')}
				>
					<div>Due date</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					asChild
					className='px-4 py-2'
					onClick={() => handleModifySort('plannedFinishDate')}
				>
					<div>Planned finish Date</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskSorter;
