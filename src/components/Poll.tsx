'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { PollWithOptionsAndResults } from '@/types/prisma';
import { useRouter } from 'next/navigation';

interface PollProps {
	poll: PollWithOptionsAndResults;
}

const Poll = ({ poll }: PollProps) => {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPollAnswered, setIsPollAnswered] = useState<boolean>(false);
	const [pollResponse, setPollResponse] = useState<string>('');
	const router = useRouter();

	const { id, createdAt, expiresAt, expired, question, options } = poll;

	const handlePollResponse = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		choice: string
	) => {
		setPollResponse(choice);
		console.log(choice);
	};

	const handleSubmit = async () => {
		const answer = { id, response: pollResponse };

		console.log(answer);
		try {
			if (!session.user) {
				// throw new Error('You need to be signed in to answer polls!');
				router.push('/sign-in');
			}
			const res = await axios.post('api/response', { answer });
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-full px-1 gap-1 flex flex-col justify-evenly'>
			<h2 className='text-lg font-semibold  mb-1 mt-3'>{question}</h2>
			<div>
				{options.map(({ choice, image }) => {
					return (
						<Button
							key={choice}
							className={cn('bg-none h-fit w-6/12 relative p-1')}
							variant={'ghost'}
							onClick={(e) => handlePollResponse(e, choice)}
						>
							<h3
								className={`absolute bottom-1 left-2 text-lg font-semibold mix-blend-luminosity ${
									pollResponse !== '' && pollResponse !== choice
										? 'opacity-30'
										: ''
								} ${pollResponse === choice ? 'text-gray-600' : ''}`}
							>
								{choice}
							</h3>
							<img
								src={image!}
								alt={choice}
								className={`h-52 w-full rounded-sm object-cover ${
									pollResponse !== '' && pollResponse !== choice
										? 'opacity-30 animate-pulse'
										: ''
								}`}
							/>
						</Button>
					);
				})}
			</div>
			<div className='w-full flex flex-row gap-2 bottom-0'>
				<Button
					type='button'
					variant={'secondary'}
					onClick={() => handleSubmit()}
					className={`flex-1 bg-none p-1`}
				>
					Submit
				</Button>
				{pollResponse !== '' ? (
					<Button
						type='button'
						variant={'destructive'}
						onClick={() => setPollResponse('')}
						className='w-3/12 bg-none px-1'
					>
						Reset
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default Poll;
