'use client';

import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Theme } from '@prisma/client';

interface ThemeToggleProps {
	updateUserTheme: (choice: string) => void;
}

const ThemeToggle = ({ updateUserTheme }: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();

	const handleTheme = (theme: Theme) => {
		setTheme(theme);
		updateUserTheme(theme);
	};
	// console.log(theme);
	return (
		<div className='flex flex-row justify-between my-5'>
			<h3>Site Theme</h3>
			{/* <ThemeToggle /> */}
			<Button
				onClick={() => handleTheme(Theme.light)}
				disabled={theme === 'light' ? true : false}
			>
				<SunIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
				<span className='sr-only'>Light Mode</span>
			</Button>
			<Button
				onClick={() => handleTheme(Theme.dark)}
				disabled={theme === 'dark' ? true : false}
			>
				<MoonIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
				<span className='sr-only'>Dark Mode</span>
			</Button>
			<Button
				onClick={() => handleTheme(Theme.system)}
				disabled={theme === 'system' ? true : false}
			>
				<DesktopIcon className='h-[1.1rem] w-[1.1rem]  transition-all rotate-0 scale-100' />
				<span className='sr-only'>System</span>
			</Button>
		</div>
	);
};

export default ThemeToggle;
// const ThemeToggle = ({}: ThemeToggleProps) => {
// 	const { setTheme } = useTheme();
// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<Button variant='ghost' size='icon'>
// 					<SunIcon className='h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
// 					<MoonIcon className='absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
// 					<span className='sr-only'>Toggle theme</span>
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent align='center'>
// 				<DropdownMenuItem onClick={() => setTheme('light')}>
// 					<SunIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('dark')}>
// 					<MoonIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('system')}>
// 					<DesktopIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
// 				</DropdownMenuItem>
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };

// export default ThemeToggle;
