//'use client'

import Settings from '@/components/(user)/Settings';

interface settingsPageProps {}

const SettingsPage = ({}: settingsPageProps) => {
	return (
		<section className='container h-full flex flex-col mx-auto px-2'>
			<h2 className='text-2xl'>Settings</h2>
			<Settings />
		</section>
	);
};

export default SettingsPage;
