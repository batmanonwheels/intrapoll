import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { utapi } from 'uploadthing/server';

const PATCH = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user) return new Error('Unauthorized.');

		const { id } = session.user;

		const { key, url } = await req.json();

		if (!url) {
			return new NextResponse(
				JSON.stringify({
					status: 'error',
					message: 'Invalid url',
				}),
				{ status: 401 }
			);
		}

		// await utapi.renameFile({
		// 	fileKey: key,
		// 	newName: `interpoll-pfp-${id}`,
		// });

		// console.log(url);

		// const newUrl = url.split('_')[0] + `_interpoll-pfp-${id}`;
		// console.log(newUrl);

		const res = await prisma.user.update({
			where: {
				id,
			},
			data: {
				image: url,
			},
		});

		return new NextResponse('OK.', { status: 200 });
	} catch (error) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
};

export { PATCH };
