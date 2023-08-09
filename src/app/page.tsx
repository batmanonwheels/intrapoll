// import { Card, CardContent, CardHeader } from '@/components/ui/card';

'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data, status } = useSession();
	return (
		<section className='h-full w-full mx-auto overflow-scroll snap-mandatory snap-y '>
			<div id='todays-poll' className='h-full snap-start'>
				<h2 className='text-xl font-semibold my-2 px-1'>Poll of the Day</h2>
			</div>
			<div id='stats' className='h-full snap-start'>
				<h2 className='text-xl font-semibold my-2 px-1'>Statistics</h2>
			</div>
		</section>
	);
}
