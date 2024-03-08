import { TodoType } from '@/model/Todo';
import { FC } from 'react';
import HomeTaskCreator from './HomeTaskCreator';
import dynamic from 'next/dynamic';

const TodoCard = dynamic(() => import('@/components/Home/TodoCard'), {
	ssr: false,
});

type TodoColumnProp = {
	title: string;
	todos: TodoType[];
	state: TodoType['state'];
};

const TodoColumn: FC<TodoColumnProp> = ({ title, todos, state }) => {

	return (
		<div className='bg-white h-full flex-1 py-2 rounded-md flex flex-col shadow-lg relative'>
			<div className='text-center border-b border-zinc-100 py-1'>{title}</div>
			<div className='flex flex-col flex-grow overflow-y-scroll'>
				{todos?.map((todo, index) => {
					return <TodoCard todo={todo} key={todo._id.toString()} />;
				})}
			</div>
			<HomeTaskCreator state={state} />
		</div>
	);
};

export default TodoColumn;
