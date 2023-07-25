'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from './ui/input';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from './ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

//init form schema
const formSchema = z.object({
	username: z.string().min(12).max(32),
	password: z.string().min(8).max(120),
});

const SignInForm = ({ className, ...props }: SignInFormProps) => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	//set default values for
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { username, password } = values;
		try {
			const res = await signIn('credentials', {
				redirect: false,
				username: username,
				password: password,
				callbackUrl,
			});
			if (res && res.error)
				toast({
					title: res.error,
					description: 'Please try again',
					variant: 'destructive',
				});
			return res && res.ok ? res : null;
		} catch (e) {
			throw new Error(JSON.stringify(e));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex justify-center', className)} {...props}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5 w-full'
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='Username' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder='Password' type='password' {...field} />
								</FormControl>
								<FormMessage />
								<p className='px-2 py-1 text-sm text-center'>
									Forgot your password? <br />
									<Link href='/reset-password'>
										<span className='underline underline-offset-10'>
											Reset Password
										</span>
									</Link>
								</p>
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<Button type='submit'>Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SignInForm;
