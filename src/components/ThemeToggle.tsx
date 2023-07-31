'use client';

import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThemeToggleProps {}

const ThemeToggle = ({}: ThemeToggleProps) => {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<SunIcon className='h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<SunIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<MoonIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<DesktopIcon className='h-[1rem] w-[1rem] mx-auto my-1' />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeToggle;
