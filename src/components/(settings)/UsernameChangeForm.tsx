'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface UsernameChangeFormProps {
	username: string | undefined;
}
//init form schema
const formSchema = z
	.object({
		username: z
			.string()
			.min(5, 'The username must be 5 characters or more')
			.max(32, 'The username must be 32 characters or less')
			.regex(
				/^[a-zA-Z0-9_]+$/,
				'The username must contain only letters, numbers and underscore (_)'
			),
	})
	.required();
// .superRefine(({ username }, ctx) => {
// 	if (username === session?.user.username) {
// 		ctx.addIssue({
// 			code: 'custom',
// 			message: 'This username is identical to your current username',
// 		});
// 	}
// });

const UsernameChangeForm = ({}: UsernameChangeFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { data: session } = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: session?.user.username,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { username } = values;
		try {
			const res = await axios.patch('api/username', {
				username,
			});
		} catch (error: any) {
			// const { message } = error.response.data;
			// form.setError(
			// 	'username',
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
		<div className='my-3 mx-1'>
			<h3 className='my-2'>Change Your Username</h3>
			<div className='flex flex-row justify-evenly'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className=' w-full flex flex-row gap-2 justify-between'
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem className='flex-1'>
									{/* <FormLabel>
										Username <span className='text-red-600 opacity-90'>*</span>
									</FormLabel> */}
									<FormControl>
										<div className='relative'>
											<p className='absolute text-sm left-0 w-8 mb-1 inset-y-0 grid place-items-center text-gray-600'>
												@
											</p>
											<Input
												placeholder={session?.user.username}
												{...field}
												className='pl-6 flex-1'
											/>
										</div>
									</FormControl>
									{/* <FormDescription>
										Username must be at least 5 characters.
									</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className={cn('m-0')}
							disabled={!form.formState.isValid}
						>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default UsernameChangeForm;
