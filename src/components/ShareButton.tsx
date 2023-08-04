'use client';

import { Share2Icon as Share } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ShareButtonProps {}

const ShareButton = ({}: ShareButtonProps) => {
	return (
		<Button className={cn('my-1 w-fit')} variant={'ghost'} size={'sm'}>
			<Share
				className='h-[1.25rem] w-[1.25rem]'
				// onClick={() => Navigator.share()}
			/>
		</Button>
	);
};

export default ShareButton;
