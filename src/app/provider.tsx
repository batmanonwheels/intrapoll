'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const Provider = ({ children }: { children: ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>;
};
