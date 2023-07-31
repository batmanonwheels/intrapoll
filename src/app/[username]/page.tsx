//'use client'

import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Response, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface profileProps {
	params: { username: string };
}
export async function generateMetadata({ params }: profileProps) {
	return {
		title: `${params.username}'s Profile`,
	};
}

const getUserData = async (params: { username: string }) => {
	const session = await getServerSession(authOptions);

	const data = await prisma.user.findUnique({
		where: {
			username: params.username,
		},
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			streak: true,
			longestStreak: true,
			verifiedEmail: true,
			friends: true,
			responses: true,
		},
	});
	return data as Partial<User>;
};

const Profile = async ({ params }: profileProps) => {
	// const { name, username, image, email, streak, longestStreak, verifiedEmail } =
	// 	await getUserData(params);

	const name = 'Dev';
	const username = 'batmanonwheels';
	const image =
		'https://media.licdn.com/dms/image/D4E03AQHIQWmGZE_rRQ/profile-displayphoto-shrink_400_400/0/1671228163592?e=1696464000&v=beta&t=OpIHZWifYsLTJhKYc3pnNKSDn0z6PtiNj6_XAcvGe9s';
	const bio =
		'Gamer. Web scholar. Beer practitioner. Music evangelist. Travel guru. Friendly twitteraholic. Unapologetic coffee geek. Zombie advocate.';

	const response = {
		id: 1,
		date: 'July 30th, 2023',
		response: 'Yes',
		option: 'ONE',
		prompt: '',
	};

	const responses = [];

	return (
		<>
			<Card className='border-none h-full'>
				<CardHeader
					className={cn('flex flex-row justify-between p-3 my-auto h-28')}
				>
					<div className='flex flex-col my-auto'>
						<h2 className='text-xl font-medium  text-gray-700 dark:text-gray-100'>
							{name}
						</h2>
						<h3 className='text-sm text-gray-500 dark:text-gray-500'>
							@{username}
						</h3>
					</div>
					<Avatar className='h-20 w-20'>
						<AvatarImage src={image} alt={`${params.username}`} />
						<AvatarFallback>{params.username.split('')[0]}</AvatarFallback>
					</Avatar>
				</CardHeader>
				<div className='flex flex-row h-10 px-3 justify-evenly text-center mb-5'>
					<Link href={'/u/batmanonwheels/friends'} className='w-4/12'>
						<h4 className='text-m'>{0}</h4>
						<p className='text-xs'>friends</p>
					</Link>
					<Separator orientation='vertical' className={cn('h-full')} />
					<div className='w-4/12'>
						<h4 className='text-m'>{0}</h4>
						<p className='text-xs'>current streak</p>
					</div>
					<Separator orientation='vertical' />
					<div className='w-4/12'>
						<h4 className='text-m'>{0}</h4>
						<p className='text-xs'>longest streak</p>
					</div>
				</div>
				<Separator className='mx-auto w-full my-3' />

				{/* <CardContent className='px-2'>
					<p className='w-13/12 text-xs mx-1 text-gray-300 dark:text-gray-200'>
						{bio}
					</p>
				</CardContent> */}

				{responses.length === 0 && (
					<div className='my-auto text-center h-full'>
						<h2 className='text-l font-normal py-1'>Nothing to see here..</h2>
						<h3 className='text-sl font-light py-1'></h3>
					</div>
				)}
				{/* {responses.map()} */}
			</Card>
		</>
	);
};

export default Profile;

// <>
// 			<Card className='border-none h-full'>
// 				<CardHeader className={cn('flex flex-row my-auto')}>
// 					<Avatar>
// 						<AvatarImage src={image} alt={`${params.username}`} />
// 						<AvatarFallback>{params.username.split('')[0]}</AvatarFallback>
// 					</Avatar>
// 					<div className='flex flex-col'>
// 						<h2 className='text-xl font-medium  text-gray-700 dark:text-gray-100'>
// 							{name}
// 						</h2>
// 						<h3 className='text-sm text-gray-500 dark:text-gray-500'>
// 							@{username}
// 						</h3>
// 					</div>
// 				</CardHeader>
// 				<div className='flex flex-row h-8 justify-evenly text-center '>
// 					<div className='w-4/12'>
// 						<h4 className='text-m'>{0}</h4>
// 						<p className='text-xs'>current streak</p>
// 					</div>
// 					<Separator orientation='vertical' className={cn('h-full')} />
// 					<Link href={'/u/batmanonwheels/friends'} className='w-4/12'>
// 						<h4 className='text-m'>{0}</h4>
// 						<p className='text-xs'>friends</p>
// 					</Link>

// 					<Separator orientation='vertical' />
// 					<div className='w-4/12'>
// 						<h4 className='text-m'>{0}</h4>
// 						<p className='text-xs'>longest streak</p>
// 					</div>
// 					{/* <Separator orientation='vertical' />
// 				<div className='className=w-7/12'>
// 					<h4 className='text-m'>
// 						{0}/{0}
// 					</h4>
// 					<p className='text-xs'>current/longest streak</p>
// 				</div> */}
// 				</div>
// 				<Separator className='mx-auto w-11/12 my-3' />
// 				<CardContent className='px-2'>
// 					<p className='w-13/12 text-xs mx-1'>{bio}</p>
// 				</CardContent>
// 				<Separator className='mx-auto w-full my-3' />
// 				{responses.length === 0 && (
// 					<div className='mx-auto text-center h-full'>
// 						<h2 className='text-xl font-medium py-1'>Nothing to see here..</h2>
// 						<h3 className='text-sl font-light py-1'>Literally</h3>
// 					</div>
// 				)}
// 			</Card>
// 		</>
