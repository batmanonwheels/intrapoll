// import { Card, CardContent, CardHeader } from '@/components/ui/card';

'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data, status } = useSession();
	console.log(data, status);

	return (
		<section className='h-full mx-auto px-2 text-center'>
			<div id='todays-poll' className='h-full'>
				{'Poll of the Day'}
			</div>
			<div id='stats' className='h-full'>
				Statistics
			</div>
			<div className=''>
				{status !== 'loading' ? (
					<button onClick={() => signOut()}>Sign Out</button>
				) : null}
			</div>
		</section>
	);
}
