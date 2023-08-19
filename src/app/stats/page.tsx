import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

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

	console.log(id, question, responses, date);

	const [month, day, year] = date.split(' ');

	return (
		<section className='flex flex-col h-full min-h-full max-h-full'>
			<div className='flex flex-row w-full justify-between my-2 px-1'>
				<h2 className='text-xl font-semibold'>
					{`${month} ${day}th, ${year}`}
				</h2>
			</div>
			<p className='text-base text-muted-foreground mt-0 px-1'>
				{`Daily Statistics`}
			</p>
			<div className='h-fit w-full gap-1 flex flex-row my-4 px-2 relative'>
				<p className='text-base font-semibold'>
					<span className='text-base font-medium text-muted-foreground pr-2'>{`No. ${id}`}</span>
					{question}
				</p>
				<p className='absolute -bottom-4 left-2 text-xs text-muted-foreground'>{`(${
					responses[0].totalVotes
				} total ${responses[0].totalVotes === 1 ? 'vote' : 'votes'})`}</p>
			</div>
			<div className='h-auto p-2 pb-3 flex gap-2 flex-col justify-evenly'>
				{responses.map(({ option, image, votes, percentage }, i) => {
					return (
						<div
							key={option}
							className={
								'h-[6.95rem] w-full relative rounded-md bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700 dark:to-transparent border-zinc-900 '
							}
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
								className={`absolute bottom-[0.1rem] h-[.25rem] rounded-md rounded-l-none border-0 bg-gradient-to-t  to-slate-100 from-slate-50 ${
									percentage === '100%' ? 'rounded-r-md' : ''
								} z-10 `}
								style={{
									width: percentage,
								}}
							/>
							{/* <Image
								src={image}
								alt={option}
								height={500}
								width={500}
								style={{
									width: width + '%',
									height: '100%',
								}}
								className={`rounded-sm object-cover`}
								objectFit='cover'
							/> */}
						</div>
					);
				})}
			</div>
		</section>
	);
}
