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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
				'The username must contain only letters, numbers and underscores (_)'
			),
	})
	.required();

const UsernameChangeForm = ({}: UsernameChangeFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { data: session, update } = useSession();
	const router = useRouter();

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
			router.refresh();
		} catch (error: any) {
			form.setError(
				'username',
				{ type: 'validate', message: error.response.data.message },
				{
					shouldFocus: true,
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-row justify-evenly'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=' w-full flex flex-row gap-4 justify-between'
				>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className='flex-1'>
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
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' variant={'secondary'} className={cn('m-0')}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default UsernameChangeForm;
