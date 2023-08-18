/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import {
	HeartIcon as Like,
	HeartFilledIcon as Liked,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface ResponseCardProps {
	id: number;
	date: string;
	response: string;
	option: string;
	prompt: string;
	pollId: number;
	image: string;
	liked: boolean;
	name: string;
	last: boolean;
}

const ResponseCard = ({
	id,
	date,
	response,
	option,
	prompt,
	pollId,
	image,
	liked,
	name,
	last,
}: ResponseCardProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(liked);

	return (
		<li key={id} className='py-2 min-h-fit snap-start'>
			<Link href={`stats?pollId=${pollId}`} className='flex items-center '>
				<img src={image} alt={response} className='max-h-20 w-32 rounded-sm' />
				<div className='ml-4 space-y-1 w-full'>
					<p className='text-sm font-medium leading-none text-muted-foreground dark:text-muted-foreground mb-2  '>
						{date}
					</p>
					<p className='text-sm font-medium leading-none w-full'>{prompt}</p>
					<p className='text-sm text-muted-foreground'>
						{name.split(' ')[0]} prefers {response}
					</p>
				</div>
				{/* <div className='m-auto font-medium  right-0'>
					{liked ? (
						<Liked
							className='h-[1.5rem] w-[1.5rem]'
							onClick={() => setIsLiked(!isLiked)}
						/>
					) : (
						<Like
							className='h-[1.5rem] w-[1.5rem]'
							onClick={() => setIsLiked(!isLiked)}
						/>
					)}
				</div> */}
			</Link>
			<Separator className={`${last ? 'h-0 ' : ''}mt-4`} />
		</li>
	);
};

export default ResponseCard;
