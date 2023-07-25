import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<section>
			<div className='flex flex-col justify-between h-full mx-auto'>
				{/* <h2 className='text-2xl mx-auto'>Todays Poll</h2>
			<h3 className='text-xl'>Next Poll in 24 hours</h3> */}
			</div>
		</section>
	);
}
