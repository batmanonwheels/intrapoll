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

interface NameChangeFormProps {
	name: string | undefined;
}
//init form schema
const formSchema = z
	.object({
		name: z.string().max(24, 'The name must be 24 characters or less'),
	})
	.required();

const NameChangeForm = ({}: NameChangeFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { data: session, update } = useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: session?.user.name,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { name } = values;
		try {
			const res = await axios.patch('api/name', {
				name,
			});
			router.refresh();
		} catch (error: any) {
			form.setError(
				'name',
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
						name='name'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormControl>
									<Input
										placeholder={session?.user.name}
										{...field}
										className='pl-3 flex-1'
									/>
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
						// disabled={
						// 	typeof window !== 'undefined' ? true : form.formState.isValid
						// }
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NameChangeForm;
