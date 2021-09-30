import React from 'react';
import AuthProvider from '../config/AuthProvider';
import Routes from './Routes';

const Providers = () => {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default Providers;