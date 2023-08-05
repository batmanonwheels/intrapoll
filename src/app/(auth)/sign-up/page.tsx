import Link from 'next/link';
import SignUpForm from '@/components/(auth)/SignUpForm';

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
	return (
		<section className='container m-auto min-h-max flex-col p-6'>
			<SignUpForm />
			<p className='px-8 py-4 text-sm text-center'>
				Already have an account?{' '}
				<Link href='/sign-in'>
					<span className='underline underline-offset-10'>Sign In</span>
				</Link>
			</p>
		</section>
	);
};

export default SignUp;
