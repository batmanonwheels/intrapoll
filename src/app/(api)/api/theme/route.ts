import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Theme } from '@prisma/client';

const PATCH = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user)
			return new NextResponse('Unauthorized', { status: 401 });

		const { theme } = await req.json();

		const res = await prisma.userSettings.update({
			where: {
				userId: session.user.id,
			},
			data: {
				theme:
					theme === 'system'
						? Theme.system
						: theme === 'light'
						? Theme.light
						: Theme.dark,
			},
		});

		return new NextResponse('OK.', { status: 200 });
	} catch (error) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
};

export { PATCH };
