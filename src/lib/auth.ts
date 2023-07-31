import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { NextAuthOptions } from 'next-auth';
import { compare } from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		AppleProvider({
			clientId: process.env.APPLE_CLIENT_ID as string,
			clientSecret: process.env.APPLE_CLIENT_SECRET as string,
		}),
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
			async authorize(credentials, req) {
				const { email, password } = credentials!;

				if (!email || !password) {
					return new Error('Please enter a username and password!');
				}

				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});

				if (!user) {
					throw new Error(
						JSON.stringify({
							errors: { message: 'This user does not exist', input: 'email' },
							status: 409,
						})
					);
				}

				if (!(await compare(password, user.password))) {
					throw new Error(
						JSON.stringify({
							errors: {
								message: 'This password is incorrect, please try again',
								input: 'password',
							},
							status: 409,
						})
					);
				}
				console.log('hi', user);
				return {
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email,
					image: user.image,
					streak: user.streak,
					longestStreak: user.longestStreak,
					verifiedEmail: user.verifiedEmail,
				} as any;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		session: ({ session, token }) => {
			// session.user.id = token.id;

			return { ...session.user, ...token };
		},
		jwt: ({ token, account, user }) => {
			// if (account) {
			// 	// console.log(account);
			// 	token.accessToken = account.access_token;
			// 	token.id = user.id;
			// }
			if (user) {
				const u = user as unknown as User;
				token.id = u.id;
				token.username = u.username;
			}

			return token;
		},
	},
	pages: {
		signIn: '/sign-in',
		newUser: '/sign-up',
		verifyRequest: '/verify-email',
		error: '/sign-in',
	},
	secret: process.env.NEXTAUTH_SECRET,
};
