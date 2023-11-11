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
import { useDispatch, useSelector } from 'react-redux';
import { sortTodoBy } from '@/redux/actions/todoAction';
import { TodoState } from '@/redux/reducers/todoReducer';
import { cn } from '@/lib/utils';
import { ReduxState } from '@/redux/store';

const TaskSorter = () => {
	const dispatch = useDispatch();

	const sortedBy = useSelector<ReduxState, TodoState['sortedBy']>(
		(state) => state.todo.sortedBy
	);

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
					<div className='flex'>
						<div
							className={cn(
								'w-1 h-1 mr-2 rounded-full border-1',
								sortedBy === 'priority' && 'bg-slate-400'
							)}
						></div>
						<div>Priority</div>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					asChild
					className='px-4 py-2'
					onClick={() => handleModifySort('dueDate')}
				>
					<div className='flex'>
						<div
							className={cn(
								'w-1 h-1 mr-2 rounded-full border-1',
								sortedBy === 'dueDate' && 'bg-slate-400'
							)}
						></div>
						<div>Due Date</div>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					asChild
					className='px-4 py-2'
					onClick={() => handleModifySort('plannedFinishDate')}
				>
					<div className='flex'>
						<div
							className={cn(
								'w-1 h-1 mr-2 rounded-full border-1',
								sortedBy === 'plannedFinishDate' && 'bg-slate-400'
							)}
						></div>
						<div>Planned Finish Date</div>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskSorter;
