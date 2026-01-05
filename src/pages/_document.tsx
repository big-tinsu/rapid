import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add any global scripts or preconnect hints here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Monnify SDK */}
        <script type="text/javascript" src="https://sdk.monnify.com/plugin/monnify.js"></script>
        {/* Paystack Inline JS */}
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>
      <body className="antialiased">
        <Main />
        {/* This div is a dedicated mount point for modals */}
        <div id="modal-root"></div>
        <NextScript />
        {/* Add any additional scripts that need to load at the end of the document */}
      </body>
    </Html>
  );
}
