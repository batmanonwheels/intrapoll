//'use client'

import { getServerSession } from 'next-auth';
import MiniUserCard from '@/components/(user)/MiniUserCard';
import ThemeToggle from '@/components/(settings)/ThemeToggle';
import { authOptions } from '@/lib/auth';
import UsernameChangeForm from '@/components/(settings)/UsernameChangeForm';

interface settingsPageProps {}

const SettingsPage = async ({}: settingsPageProps) => {
	const session = await getServerSession(authOptions);

	return (
		<section className='flex flex-col'>
			<h2 className='text-2xl font-semibold my-2 px-2'>Settings</h2>
			<MiniUserCard
				name={session?.user.name}
				username={session?.user.username}
				image={session?.user.image}
				createdAt={session?.user.createdAt}
			/>
			<UsernameChangeForm username={session?.user.username} />
			<ThemeToggle />
		</section>
	);
};

export default SettingsPage;
