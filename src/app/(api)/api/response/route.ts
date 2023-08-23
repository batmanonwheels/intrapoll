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

		const { answer } = await req.json();

		if (!session)
			return new NextResponse('Unauthorized', { status: 401, url: '/sign-in' });

		if (!session.user)
			return new NextResponse('Unauthorized', { status: 401, url: '/sign-in' });

		if (!answer.id || !answer.response || !answer.option)
			return new NextResponse('Invalid Poll Response', {
				status: 401,
				url: '/',
			});

		const pollIsCurrent: Partial<PollWithOptionsAndResults> =
			await prisma.poll.findFirstOrThrow({
				include: {
					options: {
						where: {
							choice: {
								equals: answer.response,
							},
						},
					},
				},
			});

		// if (moment(pollIsCurrent.expiresAt).isBefore()) {
		// 	const expirePost = await prisma.poll.update({
		// 		where: {
		// 			id: pollIsCurrent.id,
		// 		},
		// 		data: {
		// 			expired: true,
		// 		},
		// 	});

		// 	return NextResponse.json({
		// 		error: {
		// 			message: 'This poll has expired, please try again in a bit',
		// 		},
		// 		status: 401,
		// 	});
		// }

		if (pollIsCurrent.id !== answer.id)
			return new NextResponse('An error has occurred.', {
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
				userId: userId as number,
				pollId: pollIsCurrent.id as number,
				option: answer.option,
				response: answer.response,
				image: pollIsCurrent.options![0].image,
			},
			include: {
				poll: true,
			},
		});

		const updatePollVotes = await prisma.poll.update({
			where: {
				id: pollIsCurrent.id,
			},
			data: {
				totalVotes: {
					increment: 1,
				},
			},
		});

		const updateOptionResponseCount = await prisma.pollOption.updateMany({
			where: {
				pollId: pollIsCurrent.id,
				choice: answer.response,
			},
			data: {
				votes: {
					increment: 1,
				},
			},
		});

		const poll: PollWithOptionsAndResults | null = await prisma.poll.findUnique(
			{
				where: {
					id: pollIsCurrent.id,
				},
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
			}
		);

		if (!poll) throw new Error('Poll not found');

		const date = moment(poll.createdAt).format('MMMM D YYYY');

		const { id, question, totalVotes, options: choices } = poll;

		//add percentage of total votes to each choice object
		choices[0].percentage = (choices[0].votes / totalVotes) * 100 + '%';
		choices[1].percentage = (choices[1].votes / totalVotes) * 100 + '%';
		choices[2].percentage = (choices[2].votes / totalVotes) * 100 + '%';
		choices[3].percentage = (choices[3].votes / totalVotes) * 100 + '%';

		return NextResponse.json({
			id,
			question,
			date,
			responses: [
				{
					option: choices[0].choice,
					image: choices[0].image,
					votes: choices[0].votes,
					percentage: choices[0].percentage,
					totalVotes,
				},
				{
					option: choices[1].choice,
					image: choices[1].image,
					votes: choices[1].votes,
					percentage: choices[1].percentage,
					totalVotes,
				},
				{
					option: choices[2].choice,
					image: choices[2].image,
					votes: choices[2].votes,
					percentage: choices[2].percentage,
					totalVotes,
				},
				{
					option: choices[3].choice,
					image: choices[3].image,
					votes: choices[3].votes,
					percentage: choices[3].percentage,
					totalVotes,
				},
			],
		});
	} catch (error: any) {
		return new NextResponse(error, { status: 401 });
	}
};

export { POST };
