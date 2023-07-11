'use client';

import Link from 'next/link';
import SignUpForm from './SignUpForm';

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
	return (
		<div className='container py-10 mx-auto flex max-h-screen flex-col justify-center'>
			<h1 className='text-2xl text-center pb-3'>Join Us!</h1>
			<SignUpForm />
		</div>
	);
};

export default SignUp;
