/**
 * Environment variable type safety module for Voicello
 * This ensures type safety for all environment variables used in the application
 */

export const env = {
  // Required LiveKit connection details
  LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY as string,
  LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET as string,
  LIVEKIT_URL: process.env.LIVEKIT_URL as string,
  
  // Base URL for public links
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000',

  // Optional S3 configuration for recording
  S3_KEY_ID: process.env.S3_KEY_ID || '',
  S3_KEY_SECRET: process.env.S3_KEY_SECRET || '',
  S3_ENDPOINT: process.env.S3_ENDPOINT || '',
  S3_BUCKET: process.env.S3_BUCKET || '',
  S3_REGION: process.env.S3_REGION || '',
  
  // Public settings
  NEXT_PUBLIC_SHOW_SETTINGS_MENU: process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU === 'true',
  NEXT_PUBLIC_LK_RECORD_ENDPOINT: process.env.NEXT_PUBLIC_LK_RECORD_ENDPOINT || '/api/record',
  
  // Optional analytics
  NEXT_PUBLIC_DATADOG_CLIENT_TOKEN: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
  NEXT_PUBLIC_DATADOG_SITE: process.env.NEXT_PUBLIC_DATADOG_SITE || '',
}; 