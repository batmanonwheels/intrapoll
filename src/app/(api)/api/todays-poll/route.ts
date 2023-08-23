import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PollWithOptionsAndResults } from '@/types/prisma';
import moment from 'moment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const GET = async () => {
	try {
		const poll: PollWithOptionsAndResults | null = await prisma.poll.findFirst({
			include: {
				options: {
					select: {
						choice: true,
						image: true,
						votes: true,
					},
				},
				results: true,
			},
		});

		if (!poll) return NextResponse.json(null);

		if (moment(poll.expiresAt).isBefore()) {
			const expirePost = await prisma.poll.update({
				where: {
					id: poll.id,
				},
				data: {
					expired: true,
				},
			});
		}

		return NextResponse.json({
			poll: {
				id: poll.id,
				createdAt: poll.createdAt,
				expiresAt: poll.expiresAt,
				expired: poll.expired,
				question: poll.question,
				options: poll.options,
				results: poll.results,
			} as Partial<PollWithOptionsAndResults>,
			status: 201,
		});
	} catch (error: any) {
		console.log(error);
		return new NextResponse(error.message, { status: 401 });
	}
};
