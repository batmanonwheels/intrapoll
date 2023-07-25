import Menu from './Menu';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface NavBarProps {}

const NavBar = async ({}: NavBarProps) => {
	const session = await getServerSession(authOptions);

	return (
		<nav className='fixed top-0 min-w-full min-h-fit flex justify-between px-3 py-2'>
			<Link
				href={'/'}
				className='text-3xl font-extrabold tracking-tight lg:text-5xl'
			>
				{/* {session ? session.user!.name : 'interpoll'} */}
				interpoll
			</Link>
			<Menu />
		</nav>
	);
};

export default NavBar;
