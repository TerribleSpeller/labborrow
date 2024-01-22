// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './Providers'
import NavBar from '../components/navbar.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <NavBar />
        <div>
        <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
