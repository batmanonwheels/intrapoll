import {
	Card,
	CardContent,
	CardHeader,
	CardDescription,
} from '@/components/ui/card';

interface VerifyEmailProps {}

const VerifyEmail = ({}: VerifyEmailProps) => {
	return (
		<section className='container m-auto max-h-screen min-h-max flex-col px-0'>
			<Card className='flex flex-col px-0 border-none shadow-none'>
				<CardHeader className='text-2xl text-center pb-3'>
					Please check your Email!
				</CardHeader>
				<CardContent>
					<CardDescription className='text-center'>
						We just sent a sign in link to the email address you provided.
					</CardDescription>
				</CardContent>
			</Card>
		</section>
	);
};

export default VerifyEmail;
