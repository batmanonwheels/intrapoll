import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { UserWithSettingsAndAccount } from '@/types/prisma';

export const POST = async (req: NextRequest) => {
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

		const hashedPassword = await hash(password, 12);
		prisma;

		const user: UserWithSettingsAndAccount = await prisma.user.create({
			data: {
				name,
				username,
				email: email.toLowerCase(),
				settings: {
					create: {},
				},
				account: {
					create: {
						password: hashedPassword,
					},
				},
			},
			include: {
				settings: true,
				account: true,
			},
		});
		console.log(user);

		return NextResponse.json({
			user: {
				name: user.name,
				email: user.email,
				username: user.username,
				image: user.image,
				settings: user.settings,
				account: user.account,
			} as Partial<UserWithSettingsAndAccount>,
			status: 201,
		});
	} catch (error: any) {
		console.log(error);
		return new NextResponse(error.message, { status: 401 });
	}
};
