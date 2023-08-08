import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PATCH = async (req: NextRequest) => {
	const session = await getServerSession(authOptions);

	if (!session?.user) return new Error('Unauthorized.');

	const { username } = await req.json();

	const usernameTaken = await prisma.user.findFirst({
		where: {
			username,
		},
		select: {
			username: true,
		},
	});

	if (!!usernameTaken) {
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'This username is already in use. :(',
			}),
			{ status: 401 }
		);
	}
	const { id } = session.user;
	console.log(typeof id);

	const res = await prisma.user.update({
		where: {
			id,
		},
		data: {
			username,
		},
	});

	console.log(res);

	return new NextResponse('OK.', { status: 200 });
};

export { PATCH };
