import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');

  return (
    <>
      <Head>
        <title>NFC Smart Card | Tap • Share • Connect</title>
        <meta name="description" content="Next-generation digital business cards using NFC technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!isProfilePage && <Navbar />}
      <main>{children}</main>
      {!isProfilePage && <Footer />}
    </>
  );
}
