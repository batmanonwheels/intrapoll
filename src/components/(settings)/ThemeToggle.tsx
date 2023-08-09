'use client';

import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '../ui/form';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Theme } from '@prisma/client';
import axios from 'axios';

interface ThemeToggleProps {}

const formSchema = z
	.object({
		theme: z.string(),
	})
	.superRefine(({ theme }, ctx) => {
		if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
			ctx.addIssue({
				code: 'custom',
				message: 'Invalid selection',
			});
		}
	});

const ThemeToggle = ({}: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			theme,
		},
	});

	const handleTheme = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const { theme } = values;
		try {
			setTheme(theme);
			const res = await axios.patch('api/theme', { theme });
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-row justify-evenly'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleTheme)}
					className=' w-full flex flex-row gap-4 justify-between'
				>
					<FormField
						control={form.control}
						name='theme'
						render={({ field }) => (
							<FormItem className={cn('w-full')}>
								<Select
									onValueChange={field.onChange}
									// defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className={cn('w-full')}>
											<SelectValue placeholder='Select your preferred theme' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className={cn('w-full text-center')}>
										<SelectItem value='light'>
											{/* <SunIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' /> */}
											Light
										</SelectItem>
										<SelectItem value='dark'>
											{/* <MoonIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' /> */}
											Dark
										</SelectItem>
										<SelectItem value='system'>
											{/* <DesktopIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' /> */}
											System
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<Button type='submit' variant={'secondary'}>
						Submit
					</Button>
				</form>
			</Form>
		</div>

		// <div className='flex flex-row justify-evenly'>
		// 	<Button
		// 		onClick={() => handleTheme(Theme.light)}
		// 		disabled={theme === 'light' ? true : false}
		// 	>
		// 		<SunIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
		// 		<span className='sr-only'>Light Mode</span>
		// 	</Button>
		// 	<Button
		// 		onClick={() => handleTheme(Theme.dark)}
		// 		disabled={theme === 'dark' ? true : false}
		// 	>
		// 		<MoonIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
		// 		<span className='sr-only'>Dark Mode</span>
		// 	</Button>
		// 	<Button
		// 		onClick={() => handleTheme(Theme.system)}
		// 		disabled={theme === 'system' ? true : false}
		// 	>
		// 		<DesktopIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
		// 		<span className='sr-only'>System</span>
		// 	</Button>
		// </div>
	);
};

export default ThemeToggle;
