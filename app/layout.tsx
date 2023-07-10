import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Intrapoll',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={cn(
				'bg-white text-slate-900 antialiased light',
				inter.className
			)}
		>
			<body className='min-h-screen pt-12 bg-slate-50 dark:bg-slate-950 antialiased'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<NavBar />
					<div className='container'>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
