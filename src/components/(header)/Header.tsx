import NavMenu from './NavMenu';
import Link from 'next/link';

interface HeaderProps {}

const Header = async ({}: HeaderProps) => {
	return (
		<header className='fixed top-0 min-w-full min-h-fit flex justify-between px-2 pt-2 bg-inherit z-10 mb-0'>
			<Link href={'/'}>
				<h1 className='text-3xl font-extrabold tracking-tight lg:text-5xl'>
					interpoll
				</h1>
			</Link>
			<NavMenu />
		</header>
	);
};

export default Header;
