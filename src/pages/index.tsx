import { GetServerSideProps } from 'next';

// Server-side redirect to casino - no client-side redirect needed
// The actual redirect is handled by next.config.js
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/casino',
      permanent: false,
    },
  };
};

export default function Home() {
  // This component will never render due to server-side redirect
  return null;
}
