'use client';

import Link from 'next/link';
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
	FormDescription,
	FormMessage,
} from './ui/form';
import { Button } from './ui/button';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
	username: z.string().min(5).max(35),
	password: z.string().min(8).max(35),
});

const SignInForm = ({ className, ...props }: SignInFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
									Forgot your password?{' '}
									<Link href='/reset-password'>
										<span className='underline underline-offset-10'>Reset</span>
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
