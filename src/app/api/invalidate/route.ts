import { NextResponse } from 'next/server';

export async function POST() {
  const cache = require('../../../lib/cache-handler');
  await cache.set('homepage', null);
  return NextResponse.json({ 
    invalidated: true, 
    timestamp: new Date().toISOString() 
  });
}
