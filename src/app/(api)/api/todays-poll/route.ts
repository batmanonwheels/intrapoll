import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PollWithOptionsAndResults } from '@/types/prisma';

export const GET = async () => {
	try {
		const poll: PollWithOptionsAndResults = await prisma.poll.findFirst({
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

		return NextResponse.json({
			poll: {
				id: poll.id,
				createdAt: poll.createdAt,
				expiresAt: poll?.expiresAt,
				expired: poll?.expired,
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
