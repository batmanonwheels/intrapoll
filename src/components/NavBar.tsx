import NavMenu from './NavMenu';
import Link from 'next/link';

interface NavBarProps {}

const NavBar = async ({}: NavBarProps) => {
	return (
		<nav className='fixed top-0 min-w-full min-h-fit flex justify-between px-3 py-2 bg-inherit z-10'>
			<Link href={'/'}>
				<h1 className='text-3xl font-extrabold tracking-tight lg:text-5xl'>
					interpoll
				</h1>
			</Link>
			<NavMenu />
		</nav>
	);
};

export default NavBar;
