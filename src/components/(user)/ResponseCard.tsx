/* eslint-disable @next/next/no-img-element */
'use client';

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
	return (
		<li key={id} className='py-2 min-h-fit snap-start h-[50%]'>
			<Link href={`stats?pollId=${pollId}`} className='flex items-center '>
				<img src={image} alt={response} className='max-h-40 w-32 rounded-sm' />
				<div className='ml-4 space-y-1 w-full'>
					<p className='text-sm font-medium leading-none text-muted-foreground dark:text-muted-foreground mb-2  '>
						{date}
					</p>
					<p className='text-sm font-medium leading-none w-full'>{prompt}</p>
					<p className='text-sm text-muted-foreground'>
						{name.split(' ')[0]} prefers {response}
					</p>
				</div>
			</Link>
			<Separator className={`${last ? 'h-0 ' : ''}mt-4`} />
		</li>
	);
};

export default ResponseCard;
