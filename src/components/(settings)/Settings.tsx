'use client';

import ThemeToggle from './ThemeToggle';
import { MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import axios from 'axios';
import { Theme } from '@prisma/client';

interface SettingsProps {}

const Settings = ({}: SettingsProps) => {
	const updateUserTheme = async (theme: Theme) => {
		try {
			const res = await axios.patch('api/theme', { theme });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<ThemeToggle updateUserTheme={updateUserTheme} />
		</div>
	);
};

export default Settings;
