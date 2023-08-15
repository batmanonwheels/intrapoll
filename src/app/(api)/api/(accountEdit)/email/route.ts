import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PATCH = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user) return new Error('Unauthorized.');

		const { email } = await req.json();

		const emailTaken = await prisma.user.findFirst({
			where: {
				email,
			},
			select: {
				email: true,
			},
		});

		if (!!emailTaken) {
			return new NextResponse(
				JSON.stringify({
					status: 'error',
					message: 'This email is already in use. :(',
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
				email,
			},
		});

		console.log(res);

		return new NextResponse('OK.', { status: 200 });
	} catch (error) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
};

export { PATCH };
