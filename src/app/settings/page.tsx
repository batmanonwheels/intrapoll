//'use client'

import { getServerSession } from 'next-auth';
import MiniUserCard from '@/components/(user)/MiniUserCard';
import ThemeToggle from '@/components/(settings)/ThemeToggle';
import { authOptions } from '@/lib/auth';

interface settingsPageProps {}

const SettingsPage = async ({}: settingsPageProps) => {
	const session = await getServerSession(authOptions);
	return (
		<section className='container h-full flex flex-col mx-auto px-2'>
			{/* <h2 className='text-2xl'>Settings</h2> */}
			<MiniUserCard
				name={session?.user.name}
				username={session?.user.username}
				image={session?.user.image}
			/>
			<ThemeToggle />
		</section>
	);
};

export default SettingsPage;
