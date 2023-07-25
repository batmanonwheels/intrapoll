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
	FormDescription,
	FormMessage,
} from './ui/form';
import { Button } from './ui/button';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

//init form schema
const formSchema = z
	.object({
		name: z.string().max(24),
		email: z.string().min(12).max(255),
		username: z.string().min(5).max(32),
		password: z.string().min(8).max(120),
		confirmPassword: z.string().min(8).max(120),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
			});
		}
	});

const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

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

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { data } = await axios.post('/api/users', values, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (data) {
				signIn('credentials', {
					email: values.email,
					password: values.password,
					callbackUrl: '/',
				});
			}
		} catch (error: any) {
			console.log(error.response.data.message);
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
									<Input placeholder='Username' {...field} />
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
						<Button type='submit'>Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default SignUpForm;
