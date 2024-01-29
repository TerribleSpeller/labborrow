// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../components/Providers.js'
import NavBar from '../components/navbar.jsx'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css';
import "../public/styles.css"
import Head from 'next/head';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <Head>
          <title>BINUS ASO SCHOOL OF ENGINEERING LABORATORY WEBSITE</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
              name="description"
              content="BINUS ASO LAB WEBSITE"
          />
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        </Head>
        <div className="bg-texture-custom min-vw-100 min-vh-100">
          <NavBar />
          <div className="container">
          <Component {...pageProps} />
          </div>
          <br/>
        </div>

      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
