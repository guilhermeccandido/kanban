import { FC } from 'react';
import CustomizedDialog from '../CustomizedDialog';
import TaskEditorForm from './TaskEditorForm';
import { TodoType } from '@/model/Todo';

type TaskEditorProps = {
	open: boolean;
	onClose: () => void;
	task: TodoType | null;
};

const TaskEditor: FC<TaskEditorProps> = ({ open, onClose, task }) => {
	const handleOnSuccess = () => {
		onClose();
	};

	return (
		<CustomizedDialog open={open} onClose={onClose}>
			<TaskEditorForm handleOnSuccess={handleOnSuccess} task={task!} />
		</CustomizedDialog>
	);
};

export default TaskEditor;
