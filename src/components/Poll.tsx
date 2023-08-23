/* eslint-disable @next/next/no-img-element */
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
	id: number;
	question: string;
	date: string;
	responses: Responses[];
	error?: string;
};

const Poll = ({ poll }: PollProps) => {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPollAnswered, setIsPollAnswered] = useState<boolean>(false);
	const [pollResponse, setPollResponse] = useState<string>('');
	const [pollOption, setPollOption] = useState<string>('');
	const [responseData, setResponseData] = useState<Responses[]>([]);
	const router = useRouter();
	const { toast } = useToast();

	const { id, question, options } = poll;

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

			const { data } = await axios.post('api/response', {
				answer,
			});

			setResponseData(data.responses);

			const todaysPoll = {
				id,
				answered: true,
			};

			localStorage.setItem('pollStatus', JSON.stringify(todaysPoll));
		} catch (error: any) {
			console.log(error.message);
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
			setPollResponse('');
		}
	};

	return (
		<section className='p-1 pb-1 flex flex-col justify-between h-[82.5%] gap-1'>
			{options.map(({ choice, image }, i) => {
				return (
					<Button
						key={choice}
						className={cn(
							`${
								pollResponse !== '' && pollResponse !== choice
									? 'h-[15%] rounded-sm opacity-60 '
									: `${
											pollResponse !== choice ? 'h-[23.5%]' : 'h-[38%]'
									  } rounded-md`
							} justify-normal w-full relative rounded-md bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700 dark:to-transparent border-zinc-900 p-0 transition-all`
						)}
						variant={'ghost'}
						onClick={(e) => {
							{
								responseData.length > 0
									? null
									: handlePollResponse(e, choice, i);
							}
						}}
					>
						<h2
							className={`absolute bottom-2 right-2 text-xl font-semibold text-zinc-100 backdrop-blur-xs z-20 mix-blend-luminosity`}
						>
							{`${choice}`}
							<span
								className={`text-sm font-medium w-auto ${
									responseData.length > 0 ? 'opacity-100' : 'opacity-0'
								} transition-all duration-1000 ease-out`}
							>
								{responseData.length > 0 &&
									` ${responseData[i].percentage}, (${responseData[i].votes} ${
										responseData[i].votes === 1 ? 'vote' : 'votes'
									})`}
							</span>
						</h2>

						<img
							src={image!}
							alt={choice}
							className={`h-full w-full rounded-md object-cover border-0 outline-0 transition-all${
								pollResponse !== '' && pollResponse !== choice ? '' : ''
							}`}
						/>
						<hr
							className={`absolute bottom-[0.1rem] h-[.25rem] rounded-md rounded-l-none border-none bg-gray-50 dark:bg-grey-500${
								responseData.length > 0
									? responseData[i].percentage === '100%'
										? 'rounded-r-md'
										: ''
									: ''
							} z-10 transition-all duration-1000 ease-out`}
							style={{
								width:
									responseData.length > 0 ? responseData[i].percentage : '0%',
							}}
						/>
					</Button>
				);
			})}
			<div
				className={` ${
					pollResponse !== ''
						? 'opacity-100 h-[6%] mb-2'
						: 'opacity-0 h-[0%] mb-0'
				}  w-full flex flex-row gap-2 transition-all animate-out mb-2`}
			>
				{pollResponse !== '' ? (
					<>
						<Button
							type='button'
							variant={'default'}
							onClick={() => handleSubmit()}
							className={`flex-1 bg-none p-1 h-full transition-all animate-in`}
						>
							Submit
						</Button>
						<Button
							type='button'
							variant={'destructive'}
							onClick={() => setPollResponse('')}
							className={`w-3/12 bg-none px-1 h-full transition-all animate-in`}
						>
							Reset
						</Button>
					</>
				) : null}
			</div>
		</section>
	);
};

export default Poll;
