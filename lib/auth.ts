import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import md5 from 'md5';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 3000,
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				const { username, password } = credentials!;

				if (!username || !password) {
					throw new Error('Please enter a username and password!');
				}

				const user = await prisma.user.findFirst({
					where: {
						username,
					},
				});

				if (!user) {
					throw new Error('That user does not exist');
				}

				const verifyPassword = user?.hashedPassword === md5(password);

				if (!verifyPassword) {
					throw new Error('Password is incorrect, please try again');
				}

				return user as any;
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			console.log(token, account, user);
			if (account) {
				token.accessToken = account.access_token;
				token.id = parseInt(user.id);
				token.account = { ...account };
				token.user = { ...user };
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.accessToken = token.accessToken;
			session.user.id = token.id;
			return session;
		},
	},
	pages: {
		signIn: '/sign-in',
		verifyRequest: '/verify-email',
		newUser: '/sign-up',
		error: '/error',
	},
	secret: process.env.NEXTAUTH_SECRET,
};
