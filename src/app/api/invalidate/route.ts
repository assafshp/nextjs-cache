import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cache = require('../../../lib/cache-handler');
    
    // Add debug logging
    console.log('Cache invalidation requested');
    console.log('Cache directory:', require('os').tmpdir());
    
    // Attempt to clear cache
    const result = await cache.set('homepage', null);
    console.log('Cache invalidation result:', result);

    if (!result) {
      console.error('Failed to invalidate cache');
      return NextResponse.json({ 
        error: 'Failed to invalidate cache',
        success: false 
      }, { status: 500 });
    }

    // Success response with timestamp for debugging
    return NextResponse.json({ 
      invalidated: true, 
      timestamp: new Date().toISOString(),
      success: true
    }, { status: 200 });
  } catch (err) {
    // Type-safe error handling
    const error = err as Error;
    console.error('Cache invalidation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error occurred',
      success: false 
    }, { status: 500 });
  }
}
