import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PATCH = async (req: NextRequest) => {
	const session = await getServerSession(authOptions);

	if (!session?.user) return new Error('Unauthorized.');

	const { name } = await req.json();

	if (name === session.user.name) {
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'This is the same name. >:(',
			}),
			{ status: 401 }
		);
	}

	const { id } = session.user;

	const res = await prisma.user.update({
		where: {
			id,
		},
		data: {
			name,
		},
	});

	return new NextResponse('OK.', { status: 200 });
};

export { PATCH };
