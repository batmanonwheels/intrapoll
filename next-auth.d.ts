import { User } from '@prisma/client';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		id: number;
		accessToken: unknown;
		user: User;
		name: string;
		username: string;
		email: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: number;
		accessToken: unknown;
		name: string;
		username: string;
		email: string;
	}
}

export { Session, JWT };
