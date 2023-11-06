import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TodoCreateRequest, TodoValidator } from '@/lib/validators/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import CustomizedSelect, { Option } from '../CustomizedSelect';
import { useMutation } from 'react-query';
import { FC } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';

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
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<TodoCreateRequest>({
		resolver: zodResolver(TodoValidator),
	});

	const { mutate: submitCreateTodoTask, isLoading } = useMutation({
		mutationFn: async ({ title, state }: TodoCreateRequest) => {
			const payload = { title, state };
			const result = await axios.post('/api/todo/create', payload);
			return result;
		},
		onSuccess: () => {
			handleOnSuccess();
			router.push('/');
			router.refresh();
		},
		onError: (error) => {
			console.log(error);
			router.push('/');
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
					<div className='relative grid gap-1 pb-4'>
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
					<div className='relative grid gap-1 pb-4'>
						<Label className='text-xl' htmlFor='state'>
							State
						</Label>
						<CustomizedSelect
							options={TASK_STATE_OPTIONS}
							register={register('state')}
						/>
					</div>
					<div className='relative grid gap-1 pb-4'>
						<Label className='text-xl' htmlFor='state'>
							Deadline
						</Label>
						<Controller
							control={control}
							name='dueDate'
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[280px] justify-start text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0 bg-white z-50'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											initialFocus
											register={register('dueDate')}
										/>
									</PopoverContent>
								</Popover>
							)}
						/>
					</div>
					<div className='relative grid gap-1 pb-4'>
						<Label className='text-xl' htmlFor='state'>
							Planned Finish Date
						</Label>
						<Controller
							control={control}
							name='plannedFinishDate'
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[280px] justify-start text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0 bg-white z-50'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											initialFocus
											register={register('dueDate')}
										/>
									</PopoverContent>
								</Popover>
							)}
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
