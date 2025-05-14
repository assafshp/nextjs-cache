const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const CACHE_DIR = path.join(process.cwd(), '.next/cache/html');

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
    } catch {
      return false;
    }
  }

  getFilePath(key) {
    const hash = crypto.createHash('sha1').update(key).digest('hex');
    return path.join(CACHE_DIR, `${hash}.json`);
  }
}

module.exports = new DiskCache();
