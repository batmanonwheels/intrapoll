'use client';

import Link from 'next/link';
import SignInForm from './SignInForm';

interface SignInProps {}

const SignIn = ({}: SignInProps) => {
	return (
		<div className='container py-10 mx-auto flex max-h-screen flex-col justify-center'>
			<h1 className='text-2xl text-center pb-3'>Welcome back!</h1>
			<SignInForm />
			<p className='px-8 py-4 text-sm text-center'>
				New here?{' '}
				<Link href='/sign-up'>
					<span className='underline underline-offset-10'>Sign Up</span>
				</Link>
			</p>
		</div>
	);
};

export default SignIn;
