// import { Card, CardContent, CardHeader } from '@/components/ui/card';

'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data, status } = useSession();

	return (
		<section className='h-full w-full mx-auto px-2 text-center overflow-scroll snap-proximity snap-y '>
			{status !== 'loading' && status !== 'unauthenticated' ? (
				<div className='h-full snap-center'>
					<button onClick={() => signOut()}>Sign Out</button>
				</div>
			) : null}
			<div id='todays-poll' className='h-full snap-center'>
				{'Poll of the Day'}
			</div>
			<div id='stats' className='h-full snap-center'>
				Statistics
			</div>
		</section>
	);
}
