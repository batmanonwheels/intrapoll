import Link from 'next/link';
import SignInForm from '@/components/SignInForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import providers from 'next-auth';

interface SignInProps {}

const SignInPage = ({}: SignInProps) => {
	return (
		<section className='container m-auto min-h-max flex-col  p-6'>
			{/* <Card className='flex flex-col px-0 border-none shadow-none'>
				<CardHeader className='text-2xl text-center pb-3'>
					Welcome back!
				</CardHeader>
				<CardContent> */}
			<h2 className='text-2xl text-center pb-5'>Welcome back!</h2>
			<SignInForm />
			<p className='px-8 py-4 text-sm text-center'>
				New here?{' '}
				<Link href='/sign-up'>
					<span className='underline underline-offset-10'>Sign Up</span>
				</Link>
			</p>
			{/* </CardContent> */}
			{/* </Card> */}
		</section>
	);
};

export default SignInPage;
