import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { error } from 'console';

const GET = async (req: NextRequest, res: NextResponse) => {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			email: true,
		},
	});
	return NextResponse.json(users);
};

const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const { name, email, username, password } = (await req.json()) as {
			name: string;
			email: string;
			username: string;
			password: string;
		};

		const checkEmailUniqueness = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		const checkUsernameUniqueness = await prisma.user.findFirst({
			where: {
				username,
			},
		});

		if (checkEmailUniqueness || checkUsernameUniqueness) {
			return NextResponse.json(
				{
					message: `This ${
						checkEmailUniqueness ? 'email address' : 'username'
					} is already in use`,
					input: `${checkEmailUniqueness ? 'email' : 'username'}`,
				},
				{ status: 409 }
			);
		}

		const hashed_password = await hash(password, 12);

		const user = await prisma.user.create({
			data: {
				name,
				username,
				email: email.toLowerCase(),
				password: hashed_password,
			},
		});
		console.log(user);

		return NextResponse.json({
			user: {
				name: user.name,
				email: user.email,
				username: user.username,
				image: user.image,
			},
			status: 200,
		});
	} catch (error: any) {
		console.log(error);
		return new NextResponse(error.message, { status: 401 });
	}
};

// const POST = async (req: Request, res: Response) => {
// 	try {
// 		const { name, email, username, password } = (await req.json()) as {
// 			name: string;
// 			email: string;
// 			username: string;
// 			password: string;
// 		};

// 		const hashedPassword = md5(password);

// 		const user = await prisma.user.upsert({
// 			where: {
// 				email,
// 			},
// 			update: {},
// 			create: {
// 				name,
// 				username,
// 				email: email.toLowerCase(),
// 				hashedPassword: hashedPassword,
// 			},
// 		});

// 		// if (existingUser) {
// 		// 	throw new Error('This user already exists');
// 		// }

// 		return NextResponse.json({
// 			user,
// 		});
// 	} catch (error: any) {
// 		return new NextResponse(
// 			JSON.stringify({
// 				status: 'error',
// 				message: error.message,
// 			}),
// 			{ status: 500 }
// 		);
// 	}
// };

export { GET, POST };
