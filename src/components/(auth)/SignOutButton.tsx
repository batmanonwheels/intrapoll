'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
	return (
		<Button
			className={'text-red-400  text-center w-full my-3'}
			variant={'outline'}
			onClick={() => signOut()}
		>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
