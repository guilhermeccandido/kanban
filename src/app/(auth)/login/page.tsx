import SideNavOpener from '@/components/SideNavOpener';
import UserAuthForm from '@/components/UserAuthForm';
import { HomeIcon } from 'lucide-react';

export default function Login() {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px] bg-white p-4 mt-36 rounded-3xl shadow-lg'>
			<div className='min-w-fit flex flex-col text-center gap-4 py-4 justify-center'>
				<p className='text-2xl font-bold'>Non Simple Todo</p>
				<div>
					<p className='text-sm'>Welcome to Non Simple Todo</p>
					<p className='text-sm'>
						Non Simple Todo is a todo app that is not simple
					</p>
				</div>
				<UserAuthForm />
			</div>
		</div>
	);
}
