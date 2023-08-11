// 'use client';

import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import moment from 'moment';

export default async function Home() {
	const date = moment(Date.now()).format('MMMM D YYYY');
	const [month, day, year] = date.split(' ');

	const { data: poll } = await axios.get(
		'http://localhost:3000/api/todays-poll'
	);

	const { expiresAt } = poll.poll;

	const expiresIn = moment().to(expiresAt);

	return (
		<section className='flex flex-col h-full'>
			<Card className={cn('shadow-sm dark:shadow-neutral-800')}>
				<CardHeader className={cn('px-3 py-1 my-auto')}>
					<h2 className='text-xl font-medium text-gray-700 dark:text-gray-100'>
						{`${month} ${day}th, ${year}'s poll stats`}
					</h2>
					{/* <h3 className='text-base text-muted-foreground mt-0'>
						{`Todays poll expires ${expiresIn}`}
					</h3> */}
				</CardHeader>
			</Card>
		</section>
	);
}
