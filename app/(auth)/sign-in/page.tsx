import Link from 'next/link';
import SignInForm from '@/components/SignInForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SignInProps {}

const SignIn = ({}: SignInProps) => {
	return (
		<section className='container m-auto max-h-screen min-h-max flex-col px-0'>
			<Card className='flex flex-col px-0 border-none shadow-none'>
				<CardHeader className='text-2xl text-center pb-3'>
					Welcome back!
				</CardHeader>
				<CardContent>
					<SignInForm />
					<p className='px-8 py-4 text-sm text-center'>
						New here?{' '}
						<Link href='/sign-up'>
							<span className='underline underline-offset-10'>Sign Up</span>
						</Link>
					</p>
				</CardContent>
			</Card>
		</section>
	);
};

export default SignIn;
