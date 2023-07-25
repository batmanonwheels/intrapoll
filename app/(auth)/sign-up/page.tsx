import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SignUpForm from '@/components/SignUpForm';

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
	return (
		<section className='container m-auto max-h-screen min-h-max flex-col px-0'>
			<Card className='flex flex-col px-0 border-none shadow-none'>
				<CardHeader className='text-2xl text-center pb-3'>
					{"Let's get started!"}
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
			</Card>
		</section>
	);
};

export default SignUp;
