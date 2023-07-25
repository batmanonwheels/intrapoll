import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/NavBar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/context/AuthContext';

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
	// const session = await getServerSession(authOptions);

	return (
		<html lang='en' className={cn(`${inter.className} max-h-screen`)}>
			<body className='flex h-screen flex-col bg-grey-50 dark:bg-grey-750 antialiased box-border'>
				<Provider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<NavBar />
						<main className='flex flex-col items-center justify-between h-full px-1 pt-12 rounded-t-2xl'>
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
