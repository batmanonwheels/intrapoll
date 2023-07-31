import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SignUpForm from '@/components/SignUpForm';

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
	return (
		<section className='container m-auto min-h-max flex-col p-6'>
			{/* <Card className='flex flex-col px-0 border-none shadow-none'> */}
			{/* <CardHeader className='text-2xl text-center pb-3'>
					Join The Party
				</CardHeader> */}
			{/* <CardContent> */}
			<SignUpForm />
			<p className='px-8 py-4 text-sm text-center'>
				Already have an account?{' '}
				<Link href='/sign-in'>
					<span className='underline underline-offset-10'>Sign In</span>
				</Link>
			</p>
			{/* </CardContent> */}
			{/* </Card> */}
		</section>
	);
};

export default SignUp;
