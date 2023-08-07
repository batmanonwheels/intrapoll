import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PATCH = async (req: NextRequest) => {
	const session = await getServerSession(authOptions);

	if (!session?.user) return new Error('Unauthorized.');

	const { name } = await req.json();

	const { id } = session.user;

	const res = await prisma.user.update({
		where: {
			id: parseInt(id) as number,
		},
		data: {
			name,
		},
	});

	return new NextResponse('OK.', { status: 200 });
};

export { PATCH };
