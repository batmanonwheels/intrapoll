'use client';

import Link from 'next/link';
import UserSignUpForm from './UserSignUpForm';

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center'>
			<h1 className='text-xl text-center'>Welcome!</h1>
			<UserSignUpForm />
		</div>
	);
};

export default SignUp;
