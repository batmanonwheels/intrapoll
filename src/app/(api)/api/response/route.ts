import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PollWithOptionsAndResults } from '@/types/prisma';
import { Response } from '@prisma/client';
import moment from 'moment';

const POST = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session)
			return new NextResponse('Unauthorized', { status: 401, url: '/sign-in' });

		if (!session.user)
			return new NextResponse('Unauthorized', { status: 401, url: '/sign-in' });

		const { answer } = await req.json();

		if (!answer.id || !answer.response || !answer.option)
			return new NextResponse('Invalid Poll Response', {
				status: 401,
				url: '/sign-in',
			});

		const pollIsCurrent: Partial<PollWithOptionsAndResults> =
			await prisma.poll.findFirstOrThrow({
				include: {
					options: {
						select: {
							choice: true,
							image: true,
						},
					},
					results: true,
				},
			});

		if (moment(pollIsCurrent.expiresAt).isBefore()) {
			const expirePost = await prisma.poll.update({
				where: {
					id: pollIsCurrent.id,
				},
				data: {
					expired: true,
				},
			});

			return new NextResponse(
				'This poll has expired, please try again in a bit',
				{
					status: 401,
					url: '/',
				}
			);
		}

		if (pollIsCurrent.id !== answer.id)
			return new NextResponse('This poll may be expired', {
				status: 401,
				url: '/',
			});

		const { id: userId } = session.user;

		const responseExists = await prisma.response.findFirst({
			where: {
				pollId: pollIsCurrent.id,
				userId,
			},
		});

		if (responseExists)
			return new NextResponse(
				"You've already answered todays poll! See you tomorrow!",
				{
					status: 401,
					url: '/',
				}
			);

		const newResponse: Response = await prisma.response.create({
			data: {
				userId,
				pollId: pollIsCurrent.id,
				option: answer.option,
				response: answer.response,
			},
		});

		return new NextResponse('OK.', { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, { status: 401 });
	}
};

export { POST };
