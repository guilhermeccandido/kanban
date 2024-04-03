'use client';

import useDraggable from '@/hooks/useDraggable';
import { throttle } from '@/lib/helper';
import { getEarilerDate } from '@/lib/utils';
import { TodoType } from '@/model/Todo';
import { openTodoEditor } from '@/redux/actions/todoAction';
import dayjs from 'dayjs';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

type TodoProps = {
	todo: TodoType;
	handleDragging?: (
		e: MouseEvent | React.MouseEvent<HTMLDivElement>
	) => boolean;
};

const TodoCard: FC<TodoProps> = ({ todo, handleDragging }) => {
	const dispatch = useDispatch();
	const [xAdjust, setXAdjust] = useState(0);
	const handleIncreaseXAdjust = useCallback(
		throttle(() => {
			setXAdjust((prev) => prev + 1);
		}, 1000),
		[]
	);
	const handleDecreaseXAdjust = useCallback(
		throttle(() => {
			setXAdjust((prev) => prev - 1);
		}, 1000),
		[]
	);
	const _handleDragging = useCallback(
		(e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
			if (e.clientX < 20) {
				const scrolled = handleDragging ? handleDragging(e) : false;
				if (scrolled) {
					handleIncreaseXAdjust();
				}
			} else if (e.clientX > window.innerWidth - 20) {
				const scrolled = handleDragging ? handleDragging(e) : false;
				if (scrolled) {
					handleDecreaseXAdjust();
				}
			}
		},
		[handleDragging]
	);
	const { setNodeRef, attributes, isDragging } = useDraggable({
		id: todo._id.toString(),
		handleClick: (e) => {
			e.stopPropagation();
			dispatch(openTodoEditor(todo, '/'));
		},
		handleDragging: _handleDragging,
	});

	return (
		<div
			className='border-zinc-100 hover:shadow-md border rounded mb-1 px-2 py-1 w-[95%] mx-auto flex flex-col cursor-pointer bg-white'
			ref={setNodeRef}
			{...attributes}
			style={{
				right: xAdjust > 0 ? `${xAdjust * 130}%` : undefined,
				left: xAdjust < 0 ? `${-xAdjust * 130}%` : undefined,
				...attributes.style,
			}}
		>
			<div className='font-bold overflow-hidden whitespace-nowrap text-ellipsis'>
				{todo.title}
			</div>
			<div className='overflow-hidden whitespace-nowrap text-ellipsis line-clamp-3 text-sm'>
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
