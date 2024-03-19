// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.scss'; // Import your global styles here
import '../styles/swagger-theme.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
