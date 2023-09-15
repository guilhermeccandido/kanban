'use client';

import { SessionProvider } from 'next-auth/react';
import store from '../redux/store';
import { Provider } from 'react-redux';

type ProvidersProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
	return (
		<Provider store={store}>
			<SessionProvider>{children}</SessionProvider>
		</Provider>
	);
}
