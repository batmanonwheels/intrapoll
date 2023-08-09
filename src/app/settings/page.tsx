//'use client'

import { getServerSession } from 'next-auth';
import MiniUserCard from '@/components/(user)/MiniUserCard';
import ThemeToggle from '@/components/(settings)/ThemeToggle';
import { authOptions } from '@/lib/auth';
import UsernameChangeForm from '@/components/(settings)/UsernameChangeForm';
import NameChangeForm from '@/components/(settings)/NameChangeForm';
import SignOutButton from '@/components/(auth)/SignOutButton';
import EmailChangeFormAndVerify from '@/components/(settings)/EmailChangeFormAndVerify';

interface settingsPageProps {}

const SettingsPage = async ({}: settingsPageProps) => {
	const session = await getServerSession(authOptions);

	return (
		<section className='flex flex-col'>
			<h2 className='text-xl font-semibold my-2 px-1'>Edit Profile</h2>
			<MiniUserCard
				name={session?.user.name}
				username={session?.user.username}
				image={session?.user.image}
				createdAt={session?.user.createdAt}
			/>
			<div className='mx-1'>
				{/* <div className='my-3 outline-1 outline-gray-500'> */}
				<div className='my-3'>
					<h3 className='my-2'>Name</h3>
					<NameChangeForm name={session?.user.name} />
				</div>
				<div className='my-3'>
					<h3 className='my-2'>Username</h3>
					<UsernameChangeForm username={session?.user.username} />
				</div>
				<div className='my-3'>
					<h3 className='my-2'>Email</h3>
					<EmailChangeFormAndVerify email={session?.user.email} />
				</div>
				{/* </div> */}
				<div className='my-3'>
					<h3 className='my-2'>Theme</h3>
					<ThemeToggle />
				</div>
				<div className='my-3'>
					<SignOutButton />
				</div>
			</div>
		</section>
	);
};

export default SettingsPage;
