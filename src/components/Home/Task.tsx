import { TodoType } from '@/model/Todo';
import { FC } from 'react';
import CheckBox from './CheckBox';

type TaskProps = {
	todo: TodoType;
};

const Task: FC<TaskProps> = ({ todo }) => {
	return (
		<div className='flex items-center bg-white px-4 py-3 rounded-md'>
			<CheckBox/>
			<div className='mx-3'>{todo.title}</div>
		</div>
	);
};

export default Task;
