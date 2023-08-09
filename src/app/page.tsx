// 'use client';

import Poll from '@/components/Poll';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import axios from 'axios';
import moment from 'moment';

export default async function Home() {
	const date = moment(Date.now()).format('MMMM D YYYY');
	const [month, day, year] = date.split(' ');

	// const todaysPoll = await axios.get('/api/todays-poll');
	const { data: poll } = await axios.get(
		'http://localhost:3000/api/todays-poll'
	);

	const { expiresAt } = poll.poll;

	const expiresIn = moment().to(expiresAt);

	return (
		<section className='flex flex-col h-full'>
			<h2 className='text-xl font-semibold mt-2 mb-0 px-1'>
				{`${month} ${day}th, ${year}`}
			</h2>
			<h3 className='text-lg font-normal my-0 px-1 text-muted-foreground'>
				{`Todays poll expires ${expiresIn}`}
			</h3>
			{/* <Separator className={cn('mx-auto w-11/12')} /> */}
			<Poll poll={poll.poll} />
			{/* <div id='stats' className='snap-start'>
				<h2 className='text-xl font-semibold my-2 px-1'>Statistics</h2>
			</div> */}
		</section>
	);
}
