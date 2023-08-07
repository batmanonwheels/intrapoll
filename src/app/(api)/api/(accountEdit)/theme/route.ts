import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const PATCH = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user)
			return new NextResponse('Unauthorized', { status: 401 });

		const { theme } = await req.json();
		console.log(theme);

		const res = await prisma.userSettings.update({
			where: {
				userId: session.user.id,
			},
			data: {
				theme: {
					set: theme,
				},
			},
		});

		return new NextResponse('OK.', { status: 200 });
	} catch (error) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
};

export { PATCH };
