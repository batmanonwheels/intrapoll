// 'use client'

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface pageProps {}

const page = async ({}: pageProps) => {
	const { username } = await getServerSession(authOptions);
	// console.log(username);
	redirect(`/${username}`);
	return <div>page</div>;
};

export default page;
