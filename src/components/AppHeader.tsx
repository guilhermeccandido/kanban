import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { getAuthSession } from '@/lib/nextauthOptions';
import UserAvatar from './UserAvatar';

const AppHeader = async () => {
	const session = await getAuthSession();

	return (
		<div className='h-fit bg-secondary border-zinc-50 z-[10] py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 text-zinc-200'>
				<Link href='/' className='flex gap-2 items-center'>
					<p className='text-sm'>Non Simple Todo</p>
				</Link>

				{session?.user ? (
					<UserAvatar user={session.user} className='w-8 h-8'/>
				) : (
					<Link className={buttonVariants()} href={'/login'}>
						Sign In
					</Link>
				)}
			</div>
		</div>
	);
};

export default AppHeader;
