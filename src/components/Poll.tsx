'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { PollWithOptionsAndResults } from '@/types/prisma';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import moment from 'moment';

interface PollProps {
	poll: PollWithOptionsAndResults;
}

type Responses = {
	option: string;
	image: string;
	votes: number;
	percentage: string;
	totalVotes: number;
};

type ResponseData = {
	data: {
		id: number;
		question: string;
		date: string;
		responses: Responses[];
	};
};

const Poll = ({ poll }: PollProps) => {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPollAnswered, setIsPollAnswered] = useState<boolean>(false);
	const [pollResponse, setPollResponse] = useState<string>('');
	const [pollOption, setPollOption] = useState<string>('');
	const router = useRouter();
	const { toast } = useToast();

	const { id, createdAt, expiresAt, expired, question, options } = poll;

	const numberToWord = ['one', 'two', 'three', 'four', 'five', 'six'];

	const handlePollResponse = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		choice: string,
		option: number
	) => {
		setPollResponse(choice);
		setPollOption(numberToWord[option]);
	};

	const handleSubmit = async () => {
		const answer = { id, response: pollResponse, option: pollOption };

		try {
			if (!session!.user) {
				throw new Error('You need to be signed in to answer polls!');
			}
			let results = await axios.post('api/response', { answer });
			const todaysPoll = {
				answered: true,
				expiry: expiresAt,
			};

			localStorage.setItem('pollStatus', JSON.stringify(todaysPoll));

			router.push('/stats');
		} catch (error: any) {
			if (
				error.message === "Cannot read properties of null (reading 'user')" ||
				error.message === 'You need to be signed in to answer polls!'
			) {
				toast({
					title: 'You must be signed in to submit poll responses!',
					action: (
						<ToastAction altText='Sign In'>
							<Link href={'/sign-in'}>Sign In</Link>
						</ToastAction>
					),
				});
			} else if (
				error.message ===
				"You've already answered todays poll! See you tomorrow!"
			) {
				toast({
					title: "You've already answered todays poll! See you tomorrow!",
					action: (
						<ToastAction altText='Sign In'>
							<Link href={'/sign-in'}>Sign In</Link>
						</ToastAction>
					),
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-full px-1 gap-1 flex flex-col justify-evenly'>
			<div className='flex flex-row w-full my-2 px-1'>
				<h3 className='text-base font-medium text-muted-foreground pr-2'>{`No. ${id}`}</h3>
				<h3 className='text-base font-semibold'>{question}</h3>
			</div>
			<div className='p-1 pb-3 flex flex-col justify-around gap-2'>
				{options.map(({ choice, image }, i) => {
					return (
						<Button
							key={choice}
							className={cn(
								`${
									pollResponse !== '' && pollResponse !== choice
										? 'h-[5.9rem] rounded-sm opacity-60 '
										: `h-[6.95rem] rounded-md`
								} w-full relative rounded-md bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700 dark:to-transparent border-zinc-900 p-0 transition-all`
							)}
							variant={'ghost'}
							onClick={(e) => {
								handlePollResponse(e, choice, i);
							}}
						>
							<h2
								className={`absolute bottom-2 right-2 text-xl font-semibold text-zinc-100 backdrop-blur-xs z-20 mix-blend-luminosity`}
							>
								{`${choice}`}{' '}
								{/* {results !== null && results.data ? (
									<span className='text-sm font-medium'>{`${
										results.data.responses.
									}, (${results.data.responses.votes} ${
										results.data.votes === 1 ? 'vote' : 'votes'
									})`}</span>
								) : null} */}
							</h2>
							<img
								src={image!}
								alt={choice}
								className={`h-full w-full rounded-md object-cover border-0 outline-0 transition-opacity${
									pollResponse !== '' && pollResponse !== choice ? '' : ''
								}`}
							/>
							{/* <hr
									className={`absolute bottom-[0.1rem] h-[.25rem] rounded-md rounded-l-none border-0 bg-gradient-to-t  to-slate-100 from-slate-50 ${
										percentage === '100%' ? 'rounded-r-md' : ''
									} z-10 `}
									style={{
										width: percentage,
									}}
								/> */}
						</Button>
					);
				})}
			</div>

			<div
				className={` ${
					pollResponse !== '' ? 'opacity-100' : 'opacity-0'
				} w-full flex flex-row gap-2 bottom-0 transition-opacity animate-out`}
			>
				<Button
					type='button'
					variant={'default'}
					onClick={() => handleSubmit()}
					className={`flex-1 bg-none p-1 `}
					disabled={pollResponse === '' ? true : false}
				>
					Submit
				</Button>
				<Button
					type='button'
					variant={'destructive'}
					onClick={() => setPollResponse('')}
					className={`w-3/12 bg-none px-1 transition-all animate-in`}
				>
					Reset
				</Button>
			</div>
		</div>
	);
};

export default Poll;
