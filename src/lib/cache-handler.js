const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const os = require('os');

// Use system temp directory instead of .next/cache
const CACHE_DIR = path.join(os.tmpdir(), 'app-cache');

class DiskCache {
  constructor() {
    // Ensure cache directory exists
    fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});
  }

  async get(key) {
    try {
      const filePath = this.getFilePath(key);
      const content = await fs.readFile(filePath, 'utf8');
      const { value, lastModified } = JSON.parse(content);
      return { value, lastModified };
    } catch {
      return null;
    }
  }

  async set(key, value, options = {}) {
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

  getFilePath(key) {
    const hash = crypto.createHash('sha1').update(key).digest('hex');
    return path.join(CACHE_DIR, `${hash}.json`);
  }
}

module.exports = new DiskCache();
