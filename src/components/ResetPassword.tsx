import PasswordResetForm from '@/components/PasswordResetForm';

interface resetPasswordProps {}

const resetPassword = ({}: resetPasswordProps) => {
	return (
		<div className='container py-10 mx-auto flex max-h-screen flex-col justify-center'>
			<h1 className='text-2xl text-center pb-3'>Reset Password</h1>
			<PasswordResetForm />
		</div>
	);
};

export default resetPassword;
