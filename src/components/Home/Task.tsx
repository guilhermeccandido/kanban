'use client';

import { TodoType } from '@/model/Todo';
import { FC } from 'react';
import CheckBox from '../CustomizedCheckBox';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TodoCheckRequest } from '@/lib/validators/todo';
import { Types } from 'mongoose';

type TaskProps = {
	todo: TodoType;
	handleOpenTaskEditor: (id: Types.ObjectId) => void;
};

const Task: FC<TaskProps> = ({ todo, handleOpenTaskEditor }) => {
	const router = useRouter();

	const handleOnCheckBoxChange = async (value: boolean) => {
		const payload: TodoCheckRequest = { id: todo._id };
		const response = await axios.patch('/api/todo/check', payload);
		return response;
	};

	const handleOnSuccess = () => {
		router.push('/');
		router.refresh();
	};

	return (
		<div className='flex items-center bg-white px-4 py-3 rounded-md' onClick={() => handleOpenTaskEditor(todo._id)}>
			<CheckBox onChange={handleOnCheckBoxChange} onSuccess={handleOnSuccess} async={true} classname='z-10'/>
			<div className='mx-3'>{todo.title}</div>
		</div>
	);
};

export default Task;
