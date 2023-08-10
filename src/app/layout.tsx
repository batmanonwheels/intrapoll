import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/(navbar)/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from '@/app/provider';

import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'interpoll',
	description: '',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	let theme: string | null = null;

	if (!!session) {
		const res = await prisma.userSettings.findUnique({
			where: {
				userId: session!.user.id,
			},
			select: {
				theme: true,
			},
		});
		let theme = res?.theme;
	}

	return (
		<html lang='en' className={cn(`${inter.className}`)}>
			<body className='flex flex-col h-screen bg-grey-50 dark:bg-grey-500 antialiased box-border scroll-smooth overflow-x-hidden'>
				<Provider>
					<ThemeProvider
						attribute='class'
						defaultTheme={theme !== null ? theme : 'system'}
						enableSystem={theme === 'system' ? true : false}
					>
						<NavBar />
						<main className='flex-1 flex flex-col min-h-fit px-1 pt-12 rounded-t-2xl'>
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
