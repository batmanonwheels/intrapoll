import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MiniUserCardProps {
	name: string | undefined;
	username: string | undefined;
	image: string | undefined;
}

const MiniUserCard = async ({ name, username, image }: MiniUserCardProps) => {
	return (
		<Card className={cn(' shadow-sm dark:shadow-neutral-800')}>
			<CardHeader className={cn('flex flex-row gap-3 px-3 py-1 my my-auto')}>
				<Avatar className={cn('h-14 w-14 my-auto')}>
					<AvatarImage src={image} alt={`${name}`} />
					<AvatarFallback>{name?.split('')[0]}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col w-full h-full'>
					<h2 className='text-xl font-medium  text-gray-700 dark:text-gray-100'>
						{name}
					</h2>
					<h3 className='text-sm text-muted-foreground '>@{username}</h3>
					<h4 className='text-xs py-1 text-muted-foreground '>
						Member since Aug 2023
					</h4>
				</div>
			</CardHeader>
		</Card>
	);
};

export default MiniUserCard;