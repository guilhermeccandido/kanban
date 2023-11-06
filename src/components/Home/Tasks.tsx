import dbConnect from '@/lib/db';
import Task from './Task';
import TodoModel, { TodoType } from '@/model/Todo';
import { getAuthSession } from '@/lib/nextauthOptions';

const Tasks = async () => {
	const session = await getAuthSession();
	let unFinishedTodos: TodoType[] = [];
	if (session?.user) {
		const { user } = session;
		dbConnect();
		const result = await TodoModel.find({ Owner: user.id, state: ['todo', 'in-progress'] }).select({"title": 1, "state": 1, "_id": 1, "dueDate": 1, "plannedFinishDate": 1}).sort({ createdAt: -1 }).exec();
        unFinishedTodos = JSON.parse(JSON.stringify(result));
	}

	return (
		<div className='flex flex-col gap-2'>
			{unFinishedTodos.map((todo) => (
				<Task todo={todo} key={todo._id.toString()} />
			))}
		</div>
	);
};

export default Tasks;
