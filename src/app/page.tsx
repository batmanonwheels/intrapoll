// 'use client'
import Poll from '@/components/Poll';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import moment from 'moment';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const { data: pollData } = await axios.get(
		'http://localhost:3000/api/todays-poll'
	);

	const date = moment(Date.now()).format('MMMM D YYYY');
	const [month, day, year] = date.split(' ');

	if (pollData === null) {
		return (
			<section className='flex flex-col h-full'>
				<div className='flex flex-row w-full justify-between my-2 px-1'>
					<h2 className='text-xl font-semibold'>
						{`${month} ${day}th, ${year}`}
					</h2>
				</div>
				<p className='text-base text-muted-foreground mt-0 px-1'>
					{`Todays poll does not exist. :(`}
				</p>
				<div className='h-full px-1 gap-1 flex flex-col justify-evenly'>
					<h2 className='text-base font-semibold px-1  mb-1 mt-3'></h2>
				</div>
			</section>
		);
	}

	const { poll } = pollData;

	const { id, question, expiresAt } = poll;

	const expiresIn = moment().to(expiresAt);

	return (
		<section className='flex flex-col h-full justify-between gap-1'>
			<div className='h-[15%]'>
				<div className='flex flex-row w-full justify-between my-2 px-1'>
					<h2 className='text-xl font-semibold'>
						{`${month} ${day}th, ${year}`}
					</h2>
				</div>
				<p className='text-base text-muted-foreground mt-0 px-1'>
					{`Todays poll expires ${expiresIn}`}
				</p>
				<section className='flex flex-row w-full my-2 px-1 top-0 h-[50%]'>
					<p className='text-base my-auto font-medium text-muted-foreground pr-2'>{`No. ${id}`}</p>
					<p className='text-base my-auto font-semibold'>{question}</p>
				</section>
			</div>
			<Poll poll={poll} />
		</section>
	);
}
