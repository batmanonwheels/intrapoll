import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { Button, buttonVariants } from '../ui/button';
import ShareButton from '../ShareButton';
import { UserWithFriendsAndResponses } from '@/types/prisma';

interface UserCardProps {
	id: number;
	name: string;
	username: string;
	image: string;
	streak: number;
	longestStreak: number;
	friends: number;
}

const UserCard = async ({
	id,
	name,
	username,
	image,
	streak,
	longestStreak,
	friends,
}: UserCardProps) => {
	const session = await getServerSession(authOptions);

	return (
		<Card
			className={cn(
				'h-fit sticky top-[2.95rem] rounded-t-2xl z-5 shadow-sm dark:shadow-neutral-800'
			)}
		>
			<CardHeader className={cn('flex flex-row gap-3 p-3 my-auto h-28')}>
				<Avatar className={cn('h-20 w-20 my-auto')}>
					<AvatarImage src={image} alt={`${username}`} />
					<AvatarFallback>{username.split('')[0]}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col my-auto w-full'>
					<h2 className='text-xl font-medium  text-gray-700 dark:text-gray-100'>
						{name}
					</h2>
					<h3 className='text-sm text-muted-foreground dark:text-muted-foreground'>
						@{username}
					</h3>
					{session && session.user.settings!.id === id ? (
						<div className='flex flex-row justify-between w-12/12'>
							<Link
								href={'/settings'}
								className={cn(
									buttonVariants({ variant: 'outline', size: 'sm' }),
									'my-1 p-3'
								)}
							>
								Edit Profile
							</Link>
							<ShareButton />
						</div>
					) : (
						<div className='flex flex-row justify-between w-12/12'>
							<Button
								// href={'/settings'}
								className={cn('my-1 p-3')}
								variant={'outline'}
								size={'sm'}
							>
								Send Friend Request
							</Button>
							<ShareButton />
						</div>
					)}
				</div>
			</CardHeader>
			<div className='flex flex-row h-10 px-2 justify-evenly text-center mb-2'>
				<Link href={`${username}/friends`} className={cn('w-4/12')}>
					<h4 className='text-m'>{friends}</h4>
					<p className='text-xs text-muted-foreground dark:text-muted-foreground'>
						friends
					</p>
				</Link>
				<Separator orientation='vertical' className={cn('h-full')} />
				<div className='w-4/12'>
					<h4 className='text-m'>{streak}</h4>
					<p className='text-xs text-muted-foreground dark:text-muted-foreground'>
						current streak
					</p>
				</div>
				<Separator orientation='vertical' />
				<div className='w-4/12'>
					<h4 className='text-m'>{longestStreak}</h4>
					<p className='text-xs text-muted-foreground dark:text-muted-foreground'>
						longest streak
					</p>
				</div>
			</div>
			{/* <Separator className={cn('mx-auto w-full mt-3')} /> */}
		</Card>
	);
};

export default UserCard;
