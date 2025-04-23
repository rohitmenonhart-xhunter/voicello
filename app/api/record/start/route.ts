// Disable the recording API route since recording is disabled in the app

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return new NextResponse('Recording feature is currently disabled', { status: 503 });
}
