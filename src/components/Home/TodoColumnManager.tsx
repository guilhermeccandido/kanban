'use client';

import useBreakpoint from '@/hooks/useBreakpoint';
import TodoColumn from './TodoColumn';
import { FC, useState } from 'react';
import { TodoType } from '@/model/Todo';
import { TASK_STATE_OPTIONS } from '@/lib/const';
import Carousel from './Carousel';
import CarouselButton from './CarouselButton';
import DndContextProvider from '../DnDContextProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type TodoColumnManagerProp = {
	todos: TodoType[];
};

const TodoColumnManager: FC<TodoColumnManagerProp> = ({ todos }) => {
	const { md } = useBreakpoint();
	const [value, setValue] = useState(0);
	const router = useRouter();
	const todoColumeObj = todos.reduce((acc, todo) => {
		if (!Object.prototype.hasOwnProperty.call(acc, todo.state)) {
			acc[todo.state] = [todo];
		} else {
			acc[todo.state].push(todo);
		}
		return acc;
	}, {});

	const handleSlideTo = (index: number) => {
		setValue(index);
	};

	const handleDragEnd = async (dragEndEvent) => {
		const { over, from, item } = dragEndEvent;
		if (over === from) return;

		const payload = {
			id: item,
			state: over,
		};

		const result = await axios.patch('/api/todo/edit', payload);
		if (result.status === 200) {
			router.push('/');
			router.refresh();	
		}
	};

	return md! ? (
		<DndContextProvider onDragEnd={handleDragEnd}>
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
		</DndContextProvider>
	) : (
		<div className='h-[85%]'>
			<Carousel value={value} gap={32}>
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
			</Carousel>
			<CarouselButton
				to={handleSlideTo}
				numberOfSlides={TASK_STATE_OPTIONS.length}
				current={value}
			/>
		</div>
	);
};

export default TodoColumnManager;
