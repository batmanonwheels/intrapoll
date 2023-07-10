import { useState } from 'react';
import Menu from './Menu';
import Link from 'next/link';

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
	return (
		<div className='fixed top-0 min-w-full min-h-fit flex justify-between px-3 py-3'>
			<Link
				href={'/'}
				className='text-3xl font-extrabold tracking-tight lg:text-5xl'
			>
				intrapoll
			</Link>
			<Menu />
		</div>
	);
};

export default NavBar;
