// 'use client'

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface pageProps {}

const profileRedirect = async ({}: pageProps) => {
	const session = await getServerSession(authOptions);
	if (session) {
		redirect(`/${session!.username}`);
	}
	return <div>Redirecting..</div>;
};

export default profileRedirect;
