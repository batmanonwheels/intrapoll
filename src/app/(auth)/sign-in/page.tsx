import Link from 'next/link';
import SignInForm from '@/components/(auth)/SignInForm';

interface SignInProps {}

const SignInPage = ({}: SignInProps) => {
	return (
		<section className='container m-auto min-h-max flex-col  p-6'>
			<h2 className='text-2xl text-center pb-5'>Welcome back!</h2>
			<SignInForm />
			<p className='px-8 py-4 text-sm text-center'>
				New here?{' '}
				<Link href='/sign-up'>
					<span className='underline underline-offset-10'>Sign Up</span>
				</Link>
			</p>
		</section>
	);
};

export default SignInPage;
