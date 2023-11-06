'use client';

import { TodoType } from '@/model/Todo';
import { FC } from 'react';
import CheckBox from '../CustomizedCheckBox';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TodoUpdateRequest } from '@/lib/validators/todo';

type TaskProps = {
	todo: TodoType;
};

const Task: FC<TaskProps> = ({ todo }) => {
	const router = useRouter();

	const handleOnCheckBoxChange = async (value: boolean) => {
		const payload: TodoUpdateRequest = { id: todo._id, state: value ? 'done' : 'todo' };
		const response = await axios.patch('/api/todo/update', payload);
		return response;
	};

	const handleOnSuccess = () => {
		router.push('/');
		router.refresh();
	};

	return (
		<div className='flex items-center bg-white px-4 py-3 rounded-md'>
			<CheckBox onChange={handleOnCheckBoxChange} onSuccess={handleOnSuccess} async={true} />
			<div className='mx-3'>{todo.title}</div>
		</div>
	);
};

export default Task;
