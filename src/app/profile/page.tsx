// 'use client'

import { authOptions } from '@/lib/auth';
import { UserWithSettings } from '@/types/prisma';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

interface pageProps {}

const profileRedirect = async ({}: pageProps) => {
	const session = await getServerSession(authOptions);

	if (session && session.user && session.user.username) {
		redirect(`/${session.user.username}`);
	}

	return <div className='text-center m-auto'>Redirecting..</div>;
};

export default profileRedirect;
