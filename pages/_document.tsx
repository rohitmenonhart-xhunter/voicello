import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <style jsx global>{`
          /* Hide Next.js badge/icon */
          a[target="_blank"][rel="noopener noreferrer"][href^="https://nextjs.org"],
          a[target="_blank"][rel="noreferrer noopener"][href^="https://vercel.com"],
          a[rel="noopener"][target="_blank"][href="https://nextjs.org"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `}</style>
      </body>
    </Html>
  );
} 