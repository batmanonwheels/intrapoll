import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { Awaitable, NextAuthOptions } from 'next-auth';
import { compare } from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';

import { UserWithSettings, UserWithSettingsAndAccount } from '@/types/prisma';
import { UserSettings } from '@prisma/client';
import { NextResponse } from 'next/server';

export const authOptions: NextAuthOptions = {
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_CLIENT_ID as string,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		// }),
		// AppleProvider({
		// 	clientId: process.env.APPLE_CLIENT_ID as string,
		// 	clientSecret: process.env.APPLE_CLIENT_SECRET as string,
		// }),
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (credentials && (!credentials.email || !credentials.password)) {
					throw new Error(
						JSON.stringify({
							error: 'Please enter an email and password!',
							status: 409,
						})
					);
				}

				const userExists = await prisma.user.findUniqueOrThrow({
					where: {
						email: credentials!.email,
					},
					include: {
						settings: true,
						account: true,
					},
				});

				// if (!userExists) {
				// 	return NextResponse.json({
				// 		error: { message: 'This user does not exist', input: 'email' },
				// 		status: 409,
				// 	});
				// }

				if (
					!(await compare(credentials!.password, userExists!.account!.password))
				) {
					throw new Error(
						JSON.stringify({
							error: {
								message: 'This password is incorrect, please try again',
								input: 'password',
							},
							status: 409,
						})
					);
				}

				console.log(userExists);

				const user = {
					id: userExists!.id.toString(),
					name: userExists!.name,
					username: userExists!.username,
					email: userExists!.email,
					image: userExists!.image,
					streak: userExists!.streak,
					longestStreak: userExists!.longestStreak,
					createdAt: userExists!.createdAt,
					settings: userExists!.settings,
				};
				return user as any;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	callbacks: {
		jwt: async ({ token, account, user }) => {
			if (user) {
				const u = user as unknown as Partial<UserWithSettings>;
				token.id = u.id;
				token.username = u.username;
				token.createdAt = u.createdAt;
				token.settings = u.settings;
			}
			return token;
		},
		session: async ({ session, token, user }) => {
			session.user.id = token.id as number;
			session.user.username = token.username as string;
			session.user.createdAt = token.createdAt as Date;
			session.user.settings = token.settings as UserSettings;
			return session;
		},
	},
	pages: {
		signIn: '/sign-in',
		// newUser: '/sign-up',
		// verifyRequest: '/verify-email',
		error: '/sign-in',
	},
	secret: process.env.NEXTAUTH_SECRET,
};
