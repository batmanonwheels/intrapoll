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

interface PasswordResetFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
	email: z.string().min(2).max(35),
});

const PasswordResetForm = ({ className, ...props }: PasswordResetFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
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
					className='space-y-5  w-full'
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
					<div className='flex justify-center'>
						<Button type='submit'>Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default PasswordResetForm;
