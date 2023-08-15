//'use client'

import { getServerSession } from 'next-auth';
import MiniUserCard from '@/components/(user)/MiniUserCard';
import ThemeToggle from '@/components/(settings)/ThemeToggle';
import { authOptions } from '@/lib/auth';
import UsernameChangeForm from '@/components/(settings)/UsernameChangeForm';
import NameChangeForm from '@/components/(settings)/NameChangeForm';
import SignOutButton from '@/components/(auth)/SignOutButton';
import EmailChangeFormAndVerify from '@/components/(settings)/EmailChangeFormAndVerify';
import PhotoUpload from '@/components/(settings)/PhotoUpload';
import { Label } from '@/components/ui/label';

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
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					<Label htmlFor='name'>Name</Label>
					<NameChangeForm name={session?.user.name} />
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					<Label htmlFor='username'>Username</Label>
					<UsernameChangeForm username={session?.user.username} />
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					<Label htmlFor='email'>Email</Label>
					<EmailChangeFormAndVerify email={session?.user.email} />
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					<Label htmlFor='picture'>Picture</Label>
					<PhotoUpload image={session?.user.image} />
				</div>
				{/* </div> */}
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					<Label htmlFor='theme'>Theme</Label>
					<ThemeToggle />
				</div>
				<div className='grid w-full max-w-sm items-center gap-1.5 my-4'>
					{/* <Label htmlFor='picture'>Picture</Label> */}
					<SignOutButton />
				</div>
			</div>
		</section>
	);
};

export default SettingsPage;
