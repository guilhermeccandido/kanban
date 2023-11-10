import TaskCreator from '@/components/Home/TaskCreator';
import Tasks from '@/components/Home/Tasks';
import SideNavOpener from '@/components/SideNavOpener';
import dbConnect from '@/lib/db';
import { getAuthSession } from '@/lib/nextauthOptions';
import TodoModel, { TodoType } from '@/model/Todo';
import { HomeIcon } from 'lucide-react';

const Home = async () => {
	const session = await getAuthSession();
	let unFinishedTodos: TodoType[] = [];
	if (session?.user) {
		const { user } = session;
		await dbConnect();
		const result = await TodoModel.find({ Owner: user.id, state: ['todo', 'in-progress'] }).select({"title": 1, "state": 1, "_id": 1, "dueDate": 1, "plannedFinishDate": 1}).sort({ createdAt: -1 }).exec();
        unFinishedTodos = result ? JSON.parse(JSON.stringify(result)) : [];
	}

	return (
		<div>
			<div className='flex items-center pb-8'>
				<SideNavOpener pageIcon={<HomeIcon />} />
				<div className='pl-3 text-base'>Home</div>
			</div>
			<Tasks unFinishedTodos={unFinishedTodos} />
			<TaskCreator />
		</div>
	);
}

export default Home;
