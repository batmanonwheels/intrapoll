import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

import md5 from 'md5';

const GET = async () => {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			email: true,
		},
	});
	return NextResponse.json(users);
};

const POST = async (req: Request, res: Response) => {
	try {
		const { name, email, username, password } = (await req.json()) as {
			name: string;
			email: string;
			username: string;
			password: string;
		};

		const hashedPassword = md5(password);

		const user = await prisma.user.upsert({
			where: {
				email,
			},
			update: {},
			create: {
				name,
				username,
				email: email.toLowerCase(),
				hashedPassword: hashedPassword,
			},
		});

		// if (existingUser) {
		// 	throw new Error('This user already exists');
		// }

		return NextResponse.json({
			user,
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: error.message,
			}),
			{ status: 500 }
		);
	}
};

export { GET, POST };
