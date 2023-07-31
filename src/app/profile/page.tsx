// 'use client'

import { authOptions } from '@/lib/auth';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface pageProps {}

const page = async ({}: pageProps) => {
	const session: Session = await getServerSession(authOptions);
	// console.log(username);
	redirect(`/${session!.username}`);
	return <div>page</div>;
};

export default page;
