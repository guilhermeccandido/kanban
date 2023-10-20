import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TodoCreateRequest, TodoValidator } from '@/lib/validators/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import CustomizedSelect, { Option } from '../CustomizedSelect';
import { useMutation } from 'react-query';
import { FC } from 'react';
import axios from 'axios';

type TaskCreatorFormProps = {
	handleOnSuccess: () => void;
};

const TASK_STATE_OPTIONS: Option[] = [
	{
		value: 'todo',
		title: 'Todo',
	},
	{
		value: 'in progress',
		title: 'In Progress',
	},
	{
		value: 'done',
		title: 'Done',
	},
	{
		value: 'review',
		title: 'Review',
	},
];

const TaskCreatorForm: FC<TaskCreatorFormProps> = ({ handleOnSuccess }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TodoCreateRequest>({
		resolver: zodResolver(TodoValidator),
	});

	const { mutate: submitCreateTodoTask, isLoading } = useMutation({
		mutationFn: async ({ title, state }: TodoCreateRequest) => {
			const payload = { title, state };
			const result = await axios.post('/api/todo/create', payload);
			console.log(result)
		},
		onSuccess: () => {
			handleOnSuccess();
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return (
		<form
			onSubmit={handleSubmit((e) => {
				submitCreateTodoTask(e);
			})}
		>
			<Card>
				<CardHeader>
					<CardTitle>Create Todo Task</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='relative grid gap-1'>
						<Label className='text-xl' htmlFor='title'>
							Title
						</Label>
						<Input
							id='name'
							className='w-[400px]'
							size={32}
							{...register('title')}
						/>
					</div>
					<div className='relative grid gap-1'>
						<Label className='text-xl' htmlFor='state'>
							State
						</Label>
						<CustomizedSelect
							options={TASK_STATE_OPTIONS}
							register={register('state')}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button isLoading={isLoading}>Create Task</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default TaskCreatorForm;
