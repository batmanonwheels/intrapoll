/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import axios from 'axios';

interface StatsProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

interface Responses {
	option: string;
	image: string;
	votes: number;
	percentage: string;
	totalVotes: number;
}

interface ResponseData {
	data: {
		id: number;
		question: string;
		date: string;
		responses: Responses[];
	};
}

export default async function Stats({ searchParams }: StatsProps) {
	const pollId = searchParams ? searchParams.pollId : 1;

	const { data: responseData }: ResponseData = await axios.get(
		'http://localhost:3000/api/stats',
		{ params: { pollId: 1 } }
	);

	if (responseData == null) {
		return (
			<section className='flex flex-col h-full min-h-full max-h-full'></section>
		);
	}

	const { id, question, responses, date } = responseData;

	const [month, day, year] = date.split(' ');

	return (
		<div className='flex flex-col h-full justify-between'>
			<div className='h-[15%]'>
				<div className='flex flex-row w-full justify-between my-2 px-1'>
					<h2 className='text-xl font-semibold'>
						{`${month} ${day}th, ${year}`}
					</h2>
				</div>
				<p className='text-base text-muted-foreground mt-0 px-1'>
					{`Daily Statistics`}
				</p>
				<section className='flex flex-row w-full my-2 px-1 top-0 relative'>
					<p className='text-base font-medium text-muted-foreground pr-2'>{`No. ${id}`}</p>
					<p className='text-base font-semibold'>{question}</p>
					<p className='absolute -bottom-3 left-1 text-xs text-muted-foreground'>{`(${
						responses[0].totalVotes
					} total ${responses[0].totalVotes === 1 ? 'vote' : 'votes'})`}</p>
				</section>
			</div>

			<section className='p-1 pb-1 flex flex-col justify-between h-[82.5%] gap-1'>
				{responses.map(({ option, image, votes, percentage }, i) => {
					return (
						<div
							key={option}
							className={cn(
								'h-[23.5%] w-full relative rounded-md bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700 dark:to-transparent border-zinc-900 '
							)}
						>
							<h2
								className={`absolute bottom-2 right-2 text-xl font-semibold text-zinc-100 backdrop-blur-xs z-20 mix-blend-luminosity`}
							>
								{`${option}`}{' '}
								<span className='text-sm font-medium'>{`${percentage}, (${votes} ${
									votes === 1 ? 'vote' : 'votes'
								})`}</span>
							</h2>
							<img
								src={image!}
								alt={option}
								className={`h-full w-full rounded-md object-cover border-0 outline-0`}
							/>
							<hr
								className={`absolute bottom-[0.1rem] h-[.25rem] rounded-md rounded-l-none border-none bg-gray-50 dark:bg-grey-500 ${
									percentage === '100%' ? 'rounded-r-md' : ''
								} z-10 `}
								style={{
									width: percentage ? percentage : '0%',
								}}
							/>
						</div>
					);
				})}
			</section>
		</div>
	);
}
