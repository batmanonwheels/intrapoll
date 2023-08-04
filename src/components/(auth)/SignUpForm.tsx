'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '../ui/input';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

//init form schema
const formSchema = z
	.object({
		name: z.string().max(24, 'The name must be 24 characters or less'),
		email: z
			.string()
			.email({
				message: 'Invalid email. Please enter a valid email address',
			})
			.min(12, 'The email must be 12 characters or more')
			.max(255, 'The email must be 255 characters or less'),
		username: z
			.string()
			.min(5, 'The username must be 5 characters or more')
			.max(32, 'The username must be 32 characters or less')
			.regex(
				/^[a-zA-Z0-9_]+$/,
				'The username must contain only letters, numbers and underscore (_)'
			),
		password: z.string().min(8).max(120),
		confirmPassword: z.string().min(8).max(120),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords do not match',
			});
		}
	});

const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	console.log();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { name, username, email, password } = values;
		try {
			const { data } = await axios.post('api/register', {
				name,
				username,
				email,
				password,
			});
		} catch (error: any) {
			const { input, message } = error.response.data;
			form.setError(
				input,
				{ type: 'validate', message },
				{
					shouldFocus: true,
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex justify-center', className)} {...props}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5  w-full'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel>
									Name <span className='text-red-600 opacity-90'>*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder='Name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Email <span className='text-red-600 opacity-90'>*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder='Email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel>
									Username <span className='text-red-600 opacity-90'>*</span>
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<p className='absolute text-sm left-0 w-8 mb-1 inset-y-0 grid place-items-center text-gray-400'>
											@
										</p>
										<Input placeholder='Username' {...field} className='pl-6' />
									</div>
								</FormControl>
								<FormDescription>
									Username must be at least 5 characters.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Password <span className='text-red-600 opacity-90'>*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder='Password' type='password' {...field} />
								</FormControl>
								<FormDescription>
									Password must be at least 8 characters.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Confirm Password{' '}
									<span className='text-red-600 opacity-90'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Confirm password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<Button type='submit' disabled={!form.formState.isValid}>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SignUpForm;
