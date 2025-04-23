<a href="https://livekit.io/">
  <img src="./.github/assets/livekit-mark.png" alt="LiveKit logo" width="100" height="100">
</a>

# Voicello

<p>
  <a href="https://meet.livekit.io"><strong>Try the demo</strong></a>
  •
  <a href="https://github.com/livekit/components-js">LiveKit Components</a>
  •
  <a href="https://docs.livekit.io/">LiveKit Docs</a>
  •
  <a href="https://livekit.io/cloud">LiveKit Cloud</a>
  •
  <a href="https://blog.livekit.io/">Blog</a>
</p>

<br>

Voicello is an open source video conferencing app built on [LiveKit Components](https://github.com/livekit/components-js), [LiveKit Cloud](https://cloud.livekit.io/), and Next.js. It's been completely redesigned from the ground up using our new components library.

![Voicello screenshot](./.github/assets/voicello-screenshot.jpg)

## Tech Stack

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- App is built with [@livekit/components-react](https://github.com/livekit/components-js/) library.

## Demo

Give it a try at https://meet.livekit.io.

## Dev Setup

Steps to get a local dev setup up and running:

1. Run `pnpm install` to install all dependencies.
2. Copy `.env.example` in the project root and rename it to `.env.local`.
3. Update the missing environment variables in the newly created `.env.local` file.
4. Run `pnpm dev` to start the development server and visit [http://localhost:3000](http://localhost:3000) to see the result.
5. Start development 🎉

## Vercel Deployment

This application is optimized for [Vercel](https://vercel.com) deployment:

1. Fork this repository to your GitHub account.
2. Create a new project in Vercel and connect your GitHub repository.
3. Configure the environment variables:
   - `LIVEKIT_API_KEY` - Your LiveKit API key
   - `LIVEKIT_API_SECRET` - Your LiveKit API secret
   - `LIVEKIT_URL` - Your LiveKit server URL
   - `NEXT_PUBLIC_BASE_URL` - Your Vercel deployment URL (e.g., https://your-project-name.vercel.app)
4. Deploy your project.

Vercel will automatically detect the Next.js configuration and deploy your application with all the optimizations enabled.

### Optimizations for Vercel:
- Uses `output: 'standalone'` for smaller, more efficient deployments
- Configured image optimization with proper remote patterns
- Optimized for serverless functions with appropriate package externalization
- Pre-configured environment variable structure
