'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '../ui/form';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EmailChangeFormAndVerifyProps {
	email: string | undefined;
}
//init form schema
const formSchema = z
	.object({
		email: z
			.string()
			.email({
				message: 'Invalid email. Please enter a valid email address',
			})
			.min(12, 'The email must be 12 characters or more')
			.max(255, 'The email must be 255 characters or less'),
	})
	.required();

const EmailChangeFormAndVerify = ({}: EmailChangeFormAndVerifyProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { data: session, update } = useSession();

	const [verifyMessage, setVerifyMessage] = useState(
		session?.user.verifiedEmail ? 'Verified!' : 'Verify Email'
	);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: session?.user.email,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { email } = values;
		try {
			const res = await axios.patch('api/email', {
				email,
			});
			router.refresh();
		} catch (error: any) {
			form.setError(
				'email',
				{ type: 'validate', message: error.response.data.message },
				{
					shouldFocus: true,
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyEmail = async () => {
		session?.user.verifiedEmail
			? console.log('Already Verified!')
			: console.log('Sending Verification Email');
		setVerifyMessage('Sent!');
	};

	return (
		<div className='flex flex-row justify-evenly'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=' w-full flex flex-row flex-wrap gap-2 justify-between'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl>
									<Input
										placeholder={session?.user.email}
										{...field}
										id='email'
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className={'flex justify-between gap-2 w-full'}>
						<Button
							type='submit'
							variant={'secondary'}
							className={cn('m-0 w-6/12')}
						>
							Submit
						</Button>
						<Link
							onClick={() => handleVerifyEmail()}
							type='button'
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'm-0 w-6/12 text-center'
							)}
							href={
								session?.user.verifiedEmail || verifyMessage === 'Sent!'
									? ''
									: ''
							}
						>
							{verifyMessage}
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default EmailChangeFormAndVerify;
