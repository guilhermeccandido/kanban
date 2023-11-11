'use client';
import { FC, useMemo, useState } from 'react';
import Task from './Task';
import { TodoType } from '@/model/Todo';
import TaskEditor from './TaskEditor';
import { useSelector } from 'react-redux';
import { ReduxState } from '@/redux/store';
import { TodoState } from '@/redux/reducers/todoReducer';
import TaskOrderManager from './TaskOrderManager';

type TasksProps = {
	unFinishedTodos: TodoType[];
};

const Tasks: FC<TasksProps> = ({ unFinishedTodos }) => {
	const [openTaskEditor, setOpenTaskEditor] = useState(false);
	const [selectedTask, setSelectedTask] = useState<TodoType | null>(null);

	const sortedBy = useSelector<ReduxState, string>(
		(state) => state.todo.sortedBy
	);

	const sortAsc = useSelector<ReduxState, boolean>(
		(state) => state.todo.sortedAsc
	);

	const sortedTodos = useMemo(() => {
		let sortedTodos = [...unFinishedTodos];
		switch (sortedBy) {
			case 'priority':
				sortedTodos.sort((a, b) => {
					if (a?.dueDate === undefined) return 1;
					if (b?.dueDate === undefined) return -1;
					// consider both duedate and planned finish date to sort by priority
					const aEarilerDueDate =
						a.plannedFinishDate !== undefined
							? a.dueDate < a.plannedFinishDate
								? a.dueDate
								: a.plannedFinishDate
							: a.dueDate;
					const bEarilerDueDate =
						b.plannedFinishDate !== undefined
							? b.dueDate < b.plannedFinishDate
								? b.dueDate
								: b.plannedFinishDate
							: b.dueDate;
					if (sortAsc) {
						return aEarilerDueDate < bEarilerDueDate ? -1 : 1;
					} else {
						return aEarilerDueDate > bEarilerDueDate ? -1 : 1;
					}
				});
				break;
			case 'dueDate':
				sortedTodos.sort((a, b) => {
					if (a?.dueDate === undefined) return 1;
					if (b?.dueDate === undefined) return -1;
					if (a.dueDate === b.dueDate) return 0;
					if (sortAsc) {
						return a.dueDate < b.dueDate ? -1 : 1;
					} else {
						return a.dueDate > b.dueDate ? -1 : 1;
					}
				});
				break;
			case 'plannedFinishDate':
				sortedTodos.sort((a, b) => {
					if (a?.plannedFinishDate === undefined) return 1;
					if (b?.plannedFinishDate === undefined) return -1;
					if (a.plannedFinishDate === b.plannedFinishDate) return 0;
					if (sortAsc) {
						return a.plannedFinishDate < b.plannedFinishDate ? -1 : 1;
					} else {
						return a.plannedFinishDate > b.plannedFinishDate ? -1 : 1;
					}
				});
				break;
			default:
				break;
		}
		return sortedTodos;
	}, [unFinishedTodos, sortedBy, sortAsc]);

	const handleOpenTaskEditor = (todoId) => {
		const selectedTask = unFinishedTodos.find((todo) => todo._id === todoId);
		setSelectedTask(selectedTask!);
		setOpenTaskEditor(true);
	};

	const handleCloseTaskEditor = () => {
		setOpenTaskEditor(false);
	};

	return (
		<>
			<TaskOrderManager />
			<div className='flex flex-col gap-2'>
				{sortedTodos.map((todo) => (
					<Task
						todo={todo}
						key={todo._id.toString()}
						handleOpenTaskEditor={handleOpenTaskEditor}
					/>
				))}
				<TaskEditor
					open={openTaskEditor}
					onClose={handleCloseTaskEditor}
					task={selectedTask}
				/>
			</div>
		</>
	);
};

export default Tasks;
