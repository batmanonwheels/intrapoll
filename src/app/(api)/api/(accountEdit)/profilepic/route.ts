import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { utapi } from 'uploadthing/server';

const PATCH = async (req: NextRequest) => {
	const session = await getServerSession(authOptions);
	console.log(session);

	if (!session?.user) return new Error('Unauthorized.');

	const { id } = session.user;

	const { key, url } = await req.json();

	if (!key) {
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: 'Invalid url',
			}),
			{ status: 401 }
		);
	}

	await utapi.renameFile({
		fileKey: key,
		newName: `interpoll-pfp-${id}`,
	});

	const newUrl = url.split('_')[0] + `interpoll-pfp-${id}`;

	console.log(newUrl);

	const res = await prisma.user.update({
		where: {
			id,
		},
		data: {
			image: newUrl,
		},
	});

	return new NextResponse('OK.', { status: 200 });
};

export { PATCH };
