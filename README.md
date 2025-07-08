# Next.js Cache Demo

This project demonstrates custom caching strategies in a Next.js 15 app, including server-side and client-side cache management.

## Features

- **Server-side disk cache** using a custom handler ([`src/lib/cache-handler.js`](src/lib/cache-handler.js))
- **Client-side cache invalidation** with a UI button ([`src/app/components/ClientSideContent.tsx`](src/app/components/ClientSideContent.tsx))
- **API route** for cache invalidation ([`src/app/api/invalidate/route.ts`](src/app/api/invalidate/route.ts))
- **Tailwind CSS** for styling

## Project Structure

- [`src/app/page.tsx`](src/app/page.tsx): Main page, shows cached timestamp and client-side controls
- [`src/lib/cache-handler.js`](src/lib/cache-handler.js): Disk cache logic (using system temp directory)
- [`src/app/components/ClientSideContent.tsx`](src/app/components/ClientSideContent.tsx): Client-side time display and cache invalidation button
- [`src/app/api/invalidate/route.ts`](src/app/api/invalidate/route.ts): API endpoint to invalidate the cache

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install