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
	FormMessage,
} from '../ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { SignInResponse, signIn, useSession } from 'next-auth/react';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

//init form schema
const formSchema = z
	.object({
		email: z
			.string()
			.email({
				message: 'Invalid email. Please enter a valid email address',
			})
			.min(12)
			.max(32),
		password: z.string().min(8).max(120),
	})
	.required();

const SignInForm = ({ className, ...props }: SignInFormProps) => {
	const searchParams = useSearchParams();
	// const { data: session } = useSession();
	// const router = useRouter();

	// const { toast } = useToast();
	// const [errorMessage, setErrorMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const callbackUrl = searchParams.get('callbackUrl') || '/profile';

	//set default values for sign in form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { email, password } = values;
		try {
			const signInResponse: SignInResponse | undefined = await signIn(
				'credentials',
				{
					redirect: true,
					email,
					password,
					callbackUrl,
				}
			);
			console.log(signInResponse);

			if (signInResponse!.error) {
				throw new Error(signInResponse!.error);
			}
		} catch (e: any) {
			// form.setError(
			// 	input,
			// 	{ type: 'validate', message },
			// 	{
			// 		shouldFocus: true,
			// 	}
			// );
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex justify-center', className)} {...props}>
			{/* <button onClick={async () => await axios.post('/api/auth/signin/google')}>
				Sign In With Google
			</button> */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5 w-full'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Email' {...field} />
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
								<p className='px-2 pt-4 pb-1 text-sm text-center'>
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
