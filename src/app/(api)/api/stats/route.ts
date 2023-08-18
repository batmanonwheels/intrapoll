import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PollWithOptionsAndResults } from '@/types/prisma';
import moment from 'moment';

export const GET = async (req: any) => {
	try {
		if (!req.nextUrl.searchParams.get('pollId'))
			throw new Error('An error has occurred.');

		const pollId = parseInt(req.nextUrl.searchParams.get('pollId'));

		const poll: PollWithOptionsAndResults | null = await prisma.poll.findUnique(
			{
				where: {
					id: pollId,
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
		return new NextResponse(error.message, { status: 404 });
	}
};
