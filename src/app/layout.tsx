import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from '@/app/provider';

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
	return (
		<html lang='en' className={cn(`${inter.className} max-h-screen`)}>
			<body className='flex h-screen flex-col bg-grey-50 dark:bg-grey-500 antialiased box-border'>
				<Provider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<NavBar />
						<main className='flex flex-col justify-between h-full px-1 pt-12 rounded-t-2xl'>
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
