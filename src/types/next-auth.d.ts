import { User, UserSettings } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';
import { UserWithSettings, UserWithSettingsAndAccount } from './prisma';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		// username: string;
		// settings: UserSettings;
		// user: {
		// 	id: number;
		// 	name: string;
		// 	username: string;
		// 	email: string;
		// 	// streak: number;
		// 	// longestStreak: number;
		// 	// verifiedEmail: Date | null;
		// 	settings: UserSettings;
		// };
		user: Partial<UserWithSettingsAndAccount>;
	}
	interface JWT {
		/** OpenID ID Token */
		user: Partial<UserWithSettingsAndAccount> | null;
	}
}
