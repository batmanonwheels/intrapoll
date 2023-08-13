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
		<>
			<section className='flex flex-col h-fit'>
				<h2 className='text-xl font-semibold my-2 px-1'>Statistics</h2>
				<p className='text-base text-muted-foreground mt-0 px-1'>
					{`${month} ${day}th, ${year}`}
				</p>
			</section>
			<section className='flex flex-col h-fit'></section>
		</>
	);
}
