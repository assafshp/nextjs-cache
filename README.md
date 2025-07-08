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

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

This demo showcases Next.js caching in action:

1. **Initial Load**: The page displays a cached timestamp from the server
2. **Cache Invalidation**: Click the "Invalidate Cache" button to clear the cache
3. **Fresh Data**: Refresh the page to see the updated timestamp
4. **Cache Behavior**: Subsequent refreshes will show the same timestamp until cache is invalidated again

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## How It Works

### Server-Side Caching

The custom cache handler (`src/lib/cache-handler.js`) implements disk-based caching using the system's temporary directory. It stores cached pages and data with configurable expiration times.

### Client-Side Integration

The client-side component (`src/app/components/ClientSideContent.tsx`) provides a UI button to trigger cache invalidation via an API call to `/api/invalidate`.

### API Invalidation

The invalidation endpoint (`src/app/api/invalidate/route.ts`) clears the cache when called, forcing Next.js to regenerate pages on the next request.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Cache Issues
If you're experiencing caching problems:
1. Clear the cache using the "Invalidate Cache" button
2. Restart the development server
3. Check the browser's developer tools for any console errors

### Build Errors
If you encounter build errors:
1. Ensure all dependencies are installed: `npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Submit a pull request

## License

This project is for demonstration purposes.