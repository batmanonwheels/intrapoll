import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Poll } from '@prisma/client';

export const GET = async (req: any) => {
	const pollId = parseInt(req.nextUrl.searchParams.get(['pollId']));

	try {
		const totalVotes = await prisma.response.count({
			where: {
				id: pollId,
			},
		});
		const optionOneVotes = await prisma.response.count({
			where: {
				pollId,
				option: 'one',
			},
		});
		const optionTwoVotes = await prisma.response.count({
			where: {
				pollId,
				option: 'two',
			},
		});
		const optionThreeVotes = await prisma.response.count({
			where: {
				pollId,
				option: 'three',
			},
		});
		const optionFourVotes = await prisma.response.count({
			where: {
				pollId,
				option: 'four',
			},
		});

		const options = await prisma.poll.findFirst({
			where: {
				id: pollId,
			},
			select: {
				options: true,
			},
		});

		if (!options) return NextResponse.json(null);

		return NextResponse.json([
			{
				option: options.options[0].choice,
				votes: optionOneVotes,
				percentage: (optionOneVotes / totalVotes) * 100,
				totalVotes,
			},
			{
				option: options.options[1].choice,
				votes: optionTwoVotes,
				percentage: (optionTwoVotes / totalVotes) * 100,
				totalVotes,
			},
			{
				option: options.options[2].choice,
				votes: optionThreeVotes,
				percentage: (optionThreeVotes / totalVotes) * 100,
				totalVotes,
			},
			{
				option: options.options[3].choice,
				votes: optionFourVotes,
				percentage: (optionFourVotes / totalVotes) * 100,
				totalVotes,
			},
		]);
	} catch (error: any) {
		return new NextResponse(error.message, { status: 401 });
	}
};
