import dbConnect from '@/lib/db';
import Task from './Task';
import TodoModel, { TodoType } from '@/model/Todo';
import { getAuthSession } from '@/lib/nextauthOptions';

const Tasks = async () => {
	const session = await getAuthSession();
	let todos: TodoType[] = [];
	if (session?.user) {
		const { user } = session;
		dbConnect();
		todos = await TodoModel.find({ Owner: user.id });
	}

	return (
		<div className='flex flex-col gap-2'>
			{todos.map((todo) => (
				<Task todo={todo} key={todo._id.toString()} />
			))}
		</div>
	);
};

export default Tasks;
