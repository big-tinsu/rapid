import Head from "next/dist/shared/lib/head";
import { Landing } from "@/features/landing-page";
import NewLayout from "@/layouts/NewLayout";

export default function LandingPagePage() {
  return (
    <>
      <Head>
        <title>OneRapid Play - Home</title>
        <meta
          name="description"
          content="One Rapid Play - Fast and seamless gaming experience"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewLayout>
        <Landing />
      </NewLayout>
    </>
  );
}
