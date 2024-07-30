import UserAuthForm from '@/components/UserAuthForm';

export default function Login() {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px] bg-white p-4 mt-36 rounded-3xl shadow-lg'>
			<div className='min-w-fit flex flex-col text-center gap-4 py-4 justify-center'>
				<p className='text-2xl font-bold'>KTodo</p>
				<div>
					<p className='text-sm'>Welcome to KTodo</p>
					<p className='text-sm'>
            Please sign in or sign up to continue
					</p>
				</div>
				<UserAuthForm />
			</div>
		</div>
	);
}
