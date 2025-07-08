import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';

// Use system temp directory instead of .next/cache
const CACHE_DIR = path.join(os.tmpdir(), 'app-cache');

interface CacheValue<T = unknown> {
  value: T;
  lastModified: number;
}

interface CacheOptions {
  ttl?: number;
}

class DiskCache {
  constructor() {
    // Ensure cache directory exists
    fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});
  }

  async get<T = unknown>(key: string): Promise<CacheValue<T> | null> {
    try {
      const filePath = this.getFilePath(key);
      const content = await fs.readFile(filePath, 'utf8');
      const { value, lastModified } = JSON.parse(content);
      return { value, lastModified };
    } catch {
      return null;
    }
  }

  async set<T = unknown>(key: string, value: T, options: CacheOptions = {}): Promise<boolean> {
    try {
      const filePath = this.getFilePath(key);
      const content = JSON.stringify({
        value,
        lastModified: Date.now(),
        ...options,
      });
      await fs.writeFile(filePath, content, 'utf8');
      return true;
    } catch (error) {
      console.error('Cache write error:', error);
      return false;
    }
  }

  private getFilePath(key: string): string {
    const hash = crypto.createHash('sha1').update(key).digest('hex');
    return path.join(CACHE_DIR, `${hash}.json`);
  }
}

const diskCache = new DiskCache();
export default diskCache;