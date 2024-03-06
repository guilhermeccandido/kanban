'use client';

import useBreakpoint from '@/hooks/useBreakpoint';
import TodoColumn from './TodoColumn';
import { FC, useMemo } from 'react';
import { TodoType } from '@/model/Todo';
import { TASK_STATE_OPTIONS } from '@/lib/const';

type TodoColumnManagerProp = {
	todos: TodoType[];
};

const TodoColumnManager: FC<TodoColumnManagerProp> = ({ todos }) => {
	const { md } = useBreakpoint();
	const todoColumeObj = todos.reduce((acc, todo) => {
		if (!Object.prototype.hasOwnProperty.call(acc, todo.state)) {
			acc[todo.state] = [todo];
		} else {
			acc[todo.state].push(todo);
		}
		return acc;
	}, {});

	const handleOnDragEnd = (result) => {
		console.log(result);
	};

	return (
		<div className='h-[90%] flex gap-2'>
			{TASK_STATE_OPTIONS.map(({ value, title }) => {
				return (
					<TodoColumn
						key={value}
						title={title}
						todos={todoColumeObj[value]}
						state={value}
					/>
				);
			})}
		</div>
	);
};

export default TodoColumnManager;
