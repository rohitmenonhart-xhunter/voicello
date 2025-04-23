import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import RemoveNextJsBadge from './RemoveNextJsBadge';

export const metadata: Metadata = {
  title: {
    default: 'Voicello | Conference app for seamless communication',
    template: '%s',
  },
  description:
    'Voicello is an open source WebRTC project that gives you everything needed to build scalable and real-time audio and/or video experiences in your applications.',
  twitter: {
    creator: '@livekitted',
    site: '@livekitted',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://meet.livekit.io',
    images: [
      {
        url: 'https://meet.livekit.io/images/voicello-open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'Voicello',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/images/voicello-favicon.svg',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/images/voicello-touch.png',
        sizes: '180x180',
      },
      { rel: 'mask-icon', url: '/images/voicello-pinned-tab.svg', color: '#070707' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default" suppressHydrationWarning={true}>
        <Toaster />
        {children}
        <RemoveNextJsBadge />
      </body>
    </html>
  );
}
