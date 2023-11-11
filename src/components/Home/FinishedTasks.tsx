import { TodoType } from '@/model/Todo';
import { FC, memo, useState } from 'react';
import Task from './Task';
import { Types } from 'mongoose';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FinishedTasksManagerProps = {
	tasks: TodoType[];
	handleOpenTaskEditor: (id: Types.ObjectId) => void;
};

type FinishedTaskProps = {
	tasks: TodoType[];
};

const FinishedTasksManager: FC<FinishedTasksManagerProps> = ({
	tasks,
	handleOpenTaskEditor,
}) => {
	const [open, setOpen] = useState(false);

	const FinishedTasks = memo<FinishedTaskProps>(
		function FinishedTask({ tasks }) {
			return (
				<div className='flex flex-col gap-2'>
					{tasks.map((todo) => (
						<Task
							todo={todo}
							key={todo._id.toString()}
							handleOpenTaskEditor={handleOpenTaskEditor}
							checked={true}
						/>
					))}
				</div>
			);
		},
		(prevProps, nextProps) => {
			let same = true;
			prevProps.tasks.forEach((task, index) => {
				if (
					task._id !== nextProps.tasks[index]._id ||
					task.title !== nextProps.tasks[index].title ||
					task.description !== nextProps.tasks[index].description ||
					task.state !== nextProps.tasks[index].state ||
					task.dueDate !== nextProps.tasks[index].dueDate ||
					task.plannedFinishDate !== nextProps.tasks[index].plannedFinishDate
				) {
					same = false;
				}
			});
			return same;
		}
	);

	return (
		<>
			<div className='flex flex-col gap-2'>
				<div
					className='cursor-pointer flex justify-center items-center'
					onClick={() => setOpen((prev) => !prev)}
				>
					{open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					<span className='text-sm text-zinc-400'>Show Finished Tasks ({tasks.length})</span>
				</div>
				{open && <FinishedTasks tasks={tasks} />}
			</div>
		</>
	);
};

export default FinishedTasksManager;
