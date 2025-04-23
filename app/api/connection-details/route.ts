import { AccessToken } from 'livekit-server-sdk';
import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for getting connection details
 * Optimized for Vercel's serverless environment
 */
export const runtime = 'edge'; // Optimize for Edge runtime on Vercel

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const roomName = searchParams.get('roomName');
    const participantName = searchParams.get('participantName');

    // Validate required parameters
    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'roomName and participantName are required' },
        { status: 400 }
      );
    }

    // Create a new access token
    const apiKey = env.LIVEKIT_API_KEY;
    const apiSecret = env.LIVEKIT_API_SECRET;
    const serverUrl = env.LIVEKIT_URL;

    // Validate connection details
    if (!apiKey || !apiSecret || !serverUrl) {
      return NextResponse.json(
        { error: 'LiveKit connection details not properly configured' },
        { status: 500 }
      );
    }

    // Create token with identity and metadata
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
    });

    // Grant permissions to join the room
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    // Generate the token
    const token = at.toJwt();

    // Return the connection details
    return NextResponse.json({
      serverUrl,
      participantToken: token,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
