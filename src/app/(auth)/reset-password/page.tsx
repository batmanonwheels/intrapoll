import ResetPassword from '@/components/(auth)/ResetPassword';

interface resetPasswordProps {}

const resetPassword = ({}: resetPasswordProps) => {
	return (
		<section className='container m-auto max-h-screen min-h-max flex-col px-0'>
			<ResetPassword />
		</section>
	);
};

export default resetPassword;
