import TaskCreator from '@/components/Home/TaskCreator';
import Tasks from '@/components/Home/Tasks';
import SideNavOpener from '@/components/SideNavOpener';
import clientPromise from '@/lib/mongodb';
import { getAuthSession } from '@/lib/nextauthOptions';
import TodoModel from '@/model/Todo';
import { HomeIcon } from 'lucide-react';

export default async function Home() {
	// const session = await getAuthSession();

	let todos = ["hi"];
	// if (session?.user) {
	// } else {
  //   todos = []
  // }

	return (
		<div>
			<div className='flex items-center'>
				<SideNavOpener pageIcon={<HomeIcon />} />
				<div className='pl-3 text-base'>Home</div>
				<Tasks todos={todos}/>
				<TaskCreator />
			</div>
		</div>
	);
}
