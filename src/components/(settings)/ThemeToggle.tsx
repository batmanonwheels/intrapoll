'use client';

import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Theme } from '@prisma/client';
import axios from 'axios';

interface ThemeToggleProps {}

const ThemeToggle = ({}: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();

	const handleTheme = async (theme: Theme) => {
		setTheme(theme);
		try {
			const res = await axios.patch('api/theme', { theme });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='flex flex-row justify-evenly'>
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
