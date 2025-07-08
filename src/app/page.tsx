import { ClientSideContent } from './components/ClientSideContent';
import { headers } from 'next/headers';

// Explicitly disable static caching
export const dynamic = 'force-dynamic';

interface PageData {
  buildTime: string;
  timestamp: number;
}

function generatePageData(): PageData {
  return {
    buildTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }),
    timestamp: Date.now()
  };
}

export default async function HomePage() {
  const cache = require('../lib/cache-handler');
  const cacheKey = 'homepage';
  
  // Try to get from cache
  let data = await cache.get(cacheKey);
  let pageData: PageData;
  
  // Generate new data if not in cache or if cache was invalidated
  if (!data || !data.value) {
    pageData = generatePageData();
    await cache.set(cacheKey, pageData);
  } else {
    pageData = data.value;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Next.js Cache Demonstration</h1>
      
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cached Timestamp:</h2>
          <p className="text-lg">{pageData.buildTime}</p>
          <p className="text-sm text-gray-600 mt-2">
            This timestamp is cached and only updates when the cache is invalidated
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Cache Key: {cacheKey}, Cache Hit: {data ? 'Yes' : 'No'}
          </p>
        </div>

        <ClientSideContent />
      </div>
    </div>
  );
}
