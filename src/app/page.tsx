import TaskCreator from '@/components/Home/TaskCreator';
import TaskSorter from '@/components/Home/TaskSorter';
import Tasks from '@/components/Home/Tasks';
import SideNavOpener from '@/components/SideNavOpener';
import dbConnect from '@/lib/db';
import { getAuthSession } from '@/lib/nextauthOptions';
import TodoModel, { TodoType } from '@/model/Todo';
import { HomeIcon } from 'lucide-react';

const Home = async () => {
	const session = await getAuthSession();
	let unFinishedTodos: TodoType[] = [];
	let finishedTodos: TodoType[] = [];
	if (session?.user) {
		const { user } = session;
		await dbConnect();
		const result = await TodoModel.find({
			Owner: user.id,
		})
			.select({ title: 1, state: 1, _id: 1, dueDate: 1, plannedFinishDate: 1 })
			.sort({ createdAt: -1 })
			.exec();
		const todo = JSON.parse(JSON.stringify(result));
		unFinishedTodos = todo.filter(
			(todo) => todo.state === 'todo' || todo.state === 'in-progress'
		);

		finishedTodos = todo.filter(
			(todo) => todo.state === 'review' || todo.state === 'done'
		);
	}

	console.log(finishedTodos);

	return (
		<div>
			<div className='flex items-center pb-8 justify-between'>
				<div className='flex'>
					<SideNavOpener pageIcon={<HomeIcon />} />
					<div className='pl-3 text-base'>Todo</div>
				</div>
				<TaskSorter />
			</div>
			<Tasks unFinishedTodos={unFinishedTodos} finishedTodos={finishedTodos} />
			<TaskCreator />
		</div>
	);
};

export default Home;
