import { cn } from '@/lib/utils';
import { TodoType } from '@/model/Todo';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { TodoOfDay } from './TodoCalendar';
import TodoCell from './TodoCell';
import { useDispatch } from 'react-redux';
import { openTodoCreator } from '@/redux/actions/todoAction';
import dayjs from 'dayjs';

type DayCellProps = {
	dayCode: string;
	todos?: TodoOfDay;
	numberOfTaskdisplaying?: number;
};

const DayCell: FC<DayCellProps> = ({
	dayCode,
	todos,
	numberOfTaskdisplaying = 3,
}) => {
	const dispatch = useDispatch();
	const { day, unixTime } = useMemo(() => {
		const dayjsObj = dayjs(dayCode);
		return {
			day: dayjsObj.date(),
			unixTime: dayjsObj.unix() * 1000,
		};
	}, [dayCode]);
	const includedTodos = useMemo(() => {
		if (typeof todos === 'undefined') return null;
		let numberOfIncludedTodos = 0;
		const includedTodos: { todos: TodoOfDay; numberOfHiddenTodo: number } = {
			todos: {
				deadline: [],
				plannedDeadline: [],
				finished: [],
			},
			numberOfHiddenTodo: 0,
		};
		if (todos.deadline.length > numberOfTaskdisplaying) {
			includedTodos.todos.deadline = todos.deadline.slice(
				0,
				numberOfTaskdisplaying
			);
			numberOfIncludedTodos = numberOfTaskdisplaying;
		} else {
			includedTodos.todos.deadline = todos.deadline;
			numberOfIncludedTodos += todos.deadline.length;
		}

		if (
			todos.plannedDeadline.length + numberOfIncludedTodos >
			numberOfTaskdisplaying
		) {
			includedTodos.todos.plannedDeadline = todos.plannedDeadline.slice(
				0,
				numberOfTaskdisplaying - numberOfIncludedTodos
			);
			numberOfIncludedTodos = numberOfTaskdisplaying;
		} else {
			includedTodos.todos.plannedDeadline = todos.plannedDeadline;
			numberOfIncludedTodos += todos.plannedDeadline.length;
		}

		if (
			todos.finished.length + numberOfIncludedTodos >
			numberOfTaskdisplaying
		) {
			includedTodos.todos.finished = todos.finished.slice(
				0,
				numberOfTaskdisplaying - numberOfIncludedTodos
			);
			numberOfIncludedTodos = numberOfTaskdisplaying;
		} else {
			includedTodos.todos.finished = todos.finished;
			numberOfIncludedTodos += todos.finished.length;
		}

		includedTodos.numberOfHiddenTodo =
			Object.values(todos).reduce((acc, value) => {
				return acc + value.length;
			}, 0) - numberOfTaskdisplaying;

		return includedTodos;
	}, [todos, numberOfTaskdisplaying]);

	const handleOpenTaskCreator = () => {
		dispatch(openTodoCreator('/calendar', { dueDate: unixTime }));
	};

	return (
		<div
			className='flex-1 flex flex-col items-center border-r border-b border-zinc-300 overflow-hidden'
			onClick={handleOpenTaskCreator}
		>
			<div className='w-5 h-5'>
				<div
					className={`w-full h-full rounded-full flex justify-center items-center text-sm`}
				>
					{day}
				</div>
			</div>
			<TodoCell todos={includedTodos?.todos.deadline} ddlType='deadline' />
			<TodoCell
				todos={includedTodos?.todos.plannedDeadline}
				ddlType='plannedDeadline'
			/>
			<TodoCell todos={includedTodos?.todos.finished} ddlType='finished' />
			{includedTodos?.numberOfHiddenTodo > 0 && (
				<div className='px-2 w-full text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center'>
					{includedTodos?.numberOfHiddenTodo} todo hidden
				</div>
			)}
		</div>
	);
};

export default DayCell;
