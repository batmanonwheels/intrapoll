import { User } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		username: string;
		// user: { name: string; email: string; image: string };
		user: {
			id: number;
			name: string;
			username: string;
			email: string;
			bio: string | null;
			streak: number;
			longestStreak: number;
			verifiedEmail: Date | null;
		} & Session['user'];
	}
	interface JWT {
		/** OpenID ID Token */
		user: {
			id: number;
			name: string;
			username: string;
			email: string;
			bio: string | null;
			image: string;
			streak: number;
			longestStreak: number;
			verifiedEmail: Date | null;
		};
	}
}
