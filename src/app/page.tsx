// import { Card, CardContent, CardHeader } from '@/components/ui/card';

'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();

	return (
		<section>
			<div className='flex flex-col justify-between h-full mx-auto'>
				{session ? <button onClick={() => signOut()}>Sign Out</button> : null}
			</div>
		</section>
	);
}
