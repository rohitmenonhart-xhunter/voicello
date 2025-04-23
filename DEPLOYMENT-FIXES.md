# Vercel Deployment Fixes

This document summarizes the changes made to fix deployment issues on Vercel.

## Module Resolution Issues

1. **Fixed Import Paths**: Updated `@/` imports in `app/custom/VideoConferenceClientImpl.tsx` to use relative paths:
   ```javascript
   // Changed from
   import { DebugMode } from '@/lib/Debug';
   import { decodePassphrase } from '@/lib/client-utils';
   import { SettingsMenu } from '@/lib/SettingsMenu';
   
   // To
   import { DebugMode } from '../../lib/Debug';
   import { decodePassphrase } from '../../lib/client-utils';
   import { SettingsMenu } from '../../lib/SettingsMenu';
   ```

2. **Added Missing Dependencies**: Ensured `source-map-loader` is explicitly installed:
   ```json
   "devDependencies": {
     "source-map-loader": "^4.0.1"
   }
   ```

3. **Updated build command**: Modified Vercel build command to install the missing dependency:
   ```json
   "buildCommand": "pnpm install --no-frozen-lockfile && pnpm add -D source-map-loader && next build"
   ```

## API Route Fixes

1. **Fixed Recording API issues**: Disabled recording functionality due to compatibility issues with the current LiveKit SDK:
   ```
   # Recording completely disabled for now
   # NEXT_PUBLIC_LK_RECORD_ENDPOINT=/api/record
   ```

2. **Updated RecordingIndicator component**: Modified to handle disabled recording gracefully:
   ```javascript
   // Check if recording feature is enabled
   const recordingEndpoint = process.env.NEXT_PUBLIC_LK_RECORD_ENDPOINT;
   // Get hooks first to avoid React Hook errors
   const isRecording = useIsRecording();
   // Render null if recording is disabled
   if (!recordingEndpoint) {
     return null;
   }
   ```

3. **Added middleware**: Created a middleware file to handle API routes properly in production:
   ```javascript
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';
   
   export function middleware(request: NextRequest) {
     // Handle CORS for API routes
     if (path.startsWith('/api/')) {
       const response = NextResponse.next();
       // Add CORS headers
       response.headers.set('Access-Control-Allow-Origin', '*');
       // ...other headers
       return response;
     }
     return NextResponse.next();
   }
   ```

## Next.js Configuration

1. **Updated Next.js config**: Enhanced configuration for better production handling:
   ```javascript
   // Ensure API routes are properly handled in production
   experimental: {
     serverComponentsExternalPackages: ['sharp'],
     serverActions: {
       bodySizeLimit: '2mb',
     },
   }
   ```

2. **TSConfig paths**: Verified path aliases configuration in `tsconfig.json`:
   ```json
   "baseUrl": ".",
   "paths": {
     "@/*": ["./*"]
   }
   ```

3. **Updated .gitignore**: Improved to ensure build artifacts and environment files are properly excluded.

## Summary

These changes address the main deployment issues:
1. Module resolution errors with paths and missing dependencies
2. API route handling in production
3. React Hook usage errors in conditional statements

The application should now build successfully on Vercel without the previous errors. 