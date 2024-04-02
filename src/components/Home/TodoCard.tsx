'use client';

import useDraggable from '@/hooks/useDraggable';
import { getEarilerDate } from '@/lib/utils';
import { TodoType } from '@/model/Todo';
import { openTodoEditor } from '@/redux/actions/todoAction';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

type TodoProps = {
	todo: TodoType;
};

const TodoCard: FC<TodoProps> = ({ todo }) => {
	const dispatch = useDispatch();
	const { setNodeRef, attributes, isDragging} = useDraggable({
		id: todo._id.toString(),
		handleClick: (e) => {
			e.stopPropagation();
			dispatch(openTodoEditor(todo, '/'));
		}
	});

	return (
		<div
			className='border-zinc-100 hover:shadow-md border rounded mb-1 px-2 py-1 w-[95%] mx-auto flex flex-col cursor-pointer bg-white'
			ref={setNodeRef}
			{...attributes}
		>
			<div className='font-bold overflow-hidden whitespace-nowrap text-ellipsis'>
				{todo.title}
			</div>
			<div className='overflow-hidden whitespace-nowrap text-ellipsis line-clamp-3'>
				{todo?.description}
			</div>
			<div className='text-xs text-right'>
				{(todo.dueDate || todo.plannedFinishDate) &&
					dayjs(getEarilerDate(todo.dueDate, todo.plannedFinishDate)).format(
						'YYYY-MM-DD'
					)}
			</div>
		</div>
	);
};

export default TodoCard;
