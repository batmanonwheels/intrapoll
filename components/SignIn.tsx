'use client';

import Link from 'next/link';
import UserSignInForm from './UserSignInForm';

interface SignInProps {}

const SignIn = ({}: SignInProps) => {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center'>
			<h1 className='text-xl text-center'>Good to see you again.</h1>
			<UserSignInForm />
			<p className='px-8 text-sm text-center'>
				New here? <Link href='/sign-up'>Sign Up</Link>
			</p>
		</div>
	);
};

export default SignIn;
