import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PollWithOptionsAndResults } from '@/types/prisma';
import moment from 'moment';

export const GET = async (req: any, res: any) => {
	const search = req.nextUrl.searchParams.get(['value']);
	const params = req.nextUrl.searchParams.get(['params']);

	if (params === 'user') {
		try {
			let users = await prisma.user.findMany({
				where: {
					username: {
						startsWith: search,
						contains: search,
					},
				},
				select: {
					name: true,
					username: true,
					image: true,
					createdAt: true,
				},
			});

			return NextResponse.json(users);
		} catch (error: any) {
			return new NextResponse(error.message, { status: 401 });
		}
	} else if (params === 'poll') {
		try {
			const polls = await prisma.poll.findMany({
				where: {
					question: {
						startsWith: search,
						contains: search,
					},
				},
			});

			return NextResponse.json(polls);
		} catch (error: any) {
			return new NextResponse(error.message, { status: 401 });
		}
	}
};
