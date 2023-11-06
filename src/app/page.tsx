import TaskCreator from '@/components/Home/TaskCreator';
import Tasks from '@/components/Home/Tasks';
import SideNavOpener from '@/components/SideNavOpener';
import clientPromise from '@/lib/mongodb';
import { getAuthSession } from '@/lib/nextauthOptions';
import TodoModel from '@/model/Todo';
import { HomeIcon } from 'lucide-react';

const Home = () => {
	// const session = await getAuthSession();

	// if (session?.user) {
	// } else {
	//   todos = []
	// }

	return (
		<div>
			<div className='flex items-center pb-8'>
				<SideNavOpener pageIcon={<HomeIcon />} />
				<div className='pl-3 text-base'>Home</div>
			</div>
			<Tasks />
			<TaskCreator />
		</div>
	);
}

export default Home;
