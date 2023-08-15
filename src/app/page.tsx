// 'use client'
import Poll from '@/components/Poll';
import axios from 'axios';
import moment from 'moment';

export default async function Home() {
	const date = moment(Date.now()).format('MMMM D YYYY');
	const [month, day, year] = date.split(' ');
	const { data: poll } = await axios.get(
		'http://localhost:3000/api/todays-poll'
	);

	if (poll === null) {
		return (
			<section className='flex flex-col h-full'>
				<div className='flex flex-row w-full justify-between  my-2 px-1'>
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

	const { expiresAt } = poll.poll;

	const expiresIn = moment().to(expiresAt);

	return (
		<section className='flex flex-col h-full'>
			<div className='flex flex-row w-full justify-between my-2 px-1'>
				<h2 className='text-xl font-semibold'>
					{`${month} ${day}th, ${year}`}
				</h2>
			</div>
			<p className='text-base text-muted-foreground mt-0 px-1'>
				{`Todays poll expires ${expiresIn}`}
			</p>
			<Poll poll={poll.poll} />
		</section>
	);
}
