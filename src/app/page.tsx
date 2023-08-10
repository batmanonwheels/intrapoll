// 'use client';

import Poll from '@/components/Poll';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import moment from 'moment';

export default async function Home() {
	const date = moment(Date.now()).format('MMMM D YYYY');
	const [month, day, year] = date.split(' ');

	// const todaysPoll = await axios.get('/api/todays-poll');
	const { data: poll } = await axios.get(
		'http://localhost:3000/api/todays-poll'
	);

	if (poll === null) {
		return (
			<section className='flex flex-col h-full'>
				<Card className={cn('shadow-sm dark:shadow-neutral-800')}>
					<CardHeader className={cn('px-3 py-1 my-auto')}>
						<div className='flex flex-row w-full justify-between'>
							<h2 className='text-xl font-medium text-gray-700 dark:text-gray-100'>
								{`${month} ${day}th, ${year}`}
							</h2>
							<p className='text-base font-medium text-muted'>{`Null`}</p>
						</div>
						<p className='text-base text-muted-foreground mt-0'>
							{`Todays poll does not exist`}
						</p>
					</CardHeader>
				</Card>
				<div className='h-full px-1 gap-1 flex flex-col justify-evenly'>
					<h2 className='text-base font-semibold px-1  mb-1 mt-3'></h2>
				</div>
			</section>
		);
	}

	const { id, expiresAt } = poll.poll;

	const expiresIn = moment().to(expiresAt);

	return (
		<section className='flex flex-col h-full'>
			<Card className={cn('shadow-sm dark:shadow-neutral-800')}>
				<CardHeader className={cn('px-3 py-1 my-auto')}>
					<div className='flex flex-row w-full justify-between'>
						<h2 className='text-xl font-medium text-gray-700 dark:text-gray-100'>
							{`${month} ${day}th, ${year}`}
						</h2>
						<p className='text-base font-medium text-muted'>{`Poll No. ${id}`}</p>
					</div>
					<p className='text-base text-muted-foreground mt-0'>
						{`Todays poll expires ${expiresIn}`}
					</p>
				</CardHeader>
			</Card>
			{/* <Separator className={cn('mx-auto w-11/12')} /> */}
			<Poll poll={poll.poll} />
			{/* <div id='stats' className='snap-start'>
				<h2 className='text-xl font-semibold my-2 px-1'>Statistics</h2>
			</div> */}
		</section>
	);
}
