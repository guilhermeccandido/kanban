'use client';
import { FC, useState } from 'react';
import Task from './Task';
import { TodoType } from '@/model/Todo';
import TaskEditor from './TaskEditor';

type TasksProps = {
	unFinishedTodos: TodoType[];
};

const Tasks: FC<TasksProps> = ({ unFinishedTodos }) => {
	const [openTaskEditor, setOpenTaskEditor] = useState(false);
	const [selectedTask, setSelectedTask] = useState<TodoType | null>(null);

	const handleOpenTaskEditor = (todoId) => {
		const selectedTask = unFinishedTodos.find((todo) => todo._id === todoId);
		setSelectedTask(selectedTask!);
		setOpenTaskEditor(true);
	};

	const handleCloseTaskEditor = () => {
		setOpenTaskEditor(false);
	};

	return (
		<div className='flex flex-col gap-2'>
			{unFinishedTodos.map((todo) => (
				<Task
					todo={todo}
					key={todo._id.toString()}
					handleOpenTaskEditor={handleOpenTaskEditor}
				/>
			))}
			<TaskEditor open={openTaskEditor} onClose={handleCloseTaskEditor} task={selectedTask}/>
		</div>
	);
};

export default Tasks;
