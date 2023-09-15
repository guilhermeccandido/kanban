import AppLayout from '@/components/AppLayout';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Non Simple Todo',
	description: 'A non simple todo site',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
		</html>
	);
}
