'use client';

import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { uploadFiles } from '../../lib/uploadthing';
import { FormEvent, useState } from 'react';

interface PhotoUploadProps {
	image: string | undefined;
}

const PhotoUpload = ({ image }: PhotoUploadProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [profilePicUrl, setProfilePicUrl] = useState<string>('');
	const [profilePicKey, setProfilePicKey] = useState<string>('');

	const handleChangeProfilePic = async () => {
		console.log(profilePicKey, profilePicUrl);
		try {
			const res = await axios.patch('api/profile-pic', {
				key: profilePicKey,
				url: profilePicUrl,
			});
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleUploadImage = async (e: FormEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			if ((e.target as HTMLInputElement)!.files === null) return;

			const fileList: FileList = (e.target as HTMLInputElement).files!;

			const files: File[] = Array.from(fileList);

			const res = await uploadFiles({
				files,
				endpoint: 'profilePicture',
			});

			const { key, url } = res[0];

			setProfilePicUrl(url);
			setProfilePicKey(key);
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-row justify-evenly gap-2'>
			<div className='flex flex-col justify-evenly gap-2'>
				<div className='grid w-full max-w-sm items-center gap-2'>
					<Input
						id='picture'
						type='file'
						onInput={(e) => handleUploadImage(e)}
						className='file:text-sm text-sm'
						max={1}
					/>
				</div>
				<div className='flex flex-row gap-2'>
					<Button
						type='submit'
						className={cn('m-0 flex-1 bg-none p-1')}
						variant={'secondary'}
						onClick={() => handleChangeProfilePic()}
						disabled={profilePicUrl ? false : true}
					>
						Change Picture
					</Button>
					<Button
						type='submit'
						className={cn('m-0 w-3/12 bg-none px-1 transition-all animate-in')}
						variant={'destructive'}
						onClick={() => setProfilePicUrl('')}
						disabled={profilePicUrl ? false : true}
					>
						Cancel
					</Button>
				</div>
			</div>
			<img
				src={profilePicUrl ? profilePicUrl : image}
				alt={'Your profile picture'}
				className='h-20 mx-auto  rounded-sm'
			/>
		</div>
	);
};

export default PhotoUpload;
