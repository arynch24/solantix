// import fetch from 'node-fetch'; // Ensure you have node-fetch installed

class CacheService {
    constructor() {
        this.caches = {};
        this.DEFAULT_TTL = 3600000; // 1 hour in milliseconds
        this.cleanupIntervalId = null;
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;

        // Initialize caches for nft collection
        this.caches = {
            nftCollections: new Map(),
        };

        // Start cleanup interval
        this.cleanupIntervalId = setInterval(() => this.cleanupCaches(), 300000); // Every 5 minutes
        this.initialized = true;
        console.log('[Info] Cache service initialized');

        // Setup process termination handlers
        process.on('SIGTERM', () => this.cleanup());
        process.on('SIGINT', () => this.cleanup());
    }

    async getNftCollection(nftAddress) {
        const cache = this.caches.nftCollections;

        // Check cache first
        if (cache.has(nftAddress)) {
            const cachedValue = cache.get(nftAddress);
            // Check if the cached value is still valid
            if (Date.now() - cachedValue.timestamp < this.DEFAULT_TTL) {
                console.log(`[Info] Cache hit for NFT collection: ${nftAddress}`);
                return cachedValue.value;
            }
            // If expired, remove it from cache
            cache.delete(nftAddress);
        }

        // Fetch from API if not in cache or expired
        try {
            console.log(`[Info] Fetching collection info for NFT: ${nftAddress}`);
            const response = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${nftAddress}`, {
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            const collectionName = data?.name || "Unknown Collection";

            // Store in cache
            cache.set(nftAddress, {
                value: collectionName,
                timestamp: Date.now()
            });

            return collectionName;
        } catch (error) {
            console.error(`[Error] Failed to fetch collection name for ${nftAddress}:`, error.message);
            return "Unknown Collection";
        }
    }

    // Generic cache method that could be used for other types of data
    set(cacheName, key, value, ttl = this.DEFAULT_TTL) {
        if (!this.caches[cacheName]) {
            this.caches[cacheName] = new Map();
        }

        this.caches[cacheName].set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    get(cacheName, key) {
        if (!this.caches[cacheName]) return null;

        const cachedItem = this.caches[cacheName].get(key);
        if (!cachedItem) return null;

        // Check if item is expired
        if (Date.now() - cachedItem.timestamp > cachedItem.ttl) {
            this.caches[cacheName].delete(key);
            return null;
        }

        return cachedItem.value;
    }

    cleanupCaches() {
        const now = Date.now();

        Object.keys(this.caches).forEach(cacheName => {
            const cache = this.caches[cacheName];
            let expiredCount = 0;

            for (const [key, value] of cache.entries()) {
                if (now - value.timestamp > (value.ttl || this.DEFAULT_TTL)) {
                    cache.delete(key);
                    expiredCount++;
                }
            }

            if (expiredCount > 0) {
                console.log(`[Info] Cleaned up ${expiredCount} expired items from ${cacheName} cache`);
            }
        });
    }

    cleanup() {
        if (this.cleanupIntervalId) {
            clearInterval(this.cleanupIntervalId);
            this.cleanupIntervalId = null;
        }

        // Clear all caches
        Object.keys(this.caches).forEach(cacheName => {
            this.caches[cacheName].clear();
        });

        this.initialized = false;
        console.log('[Info] Cache service cleaned up');
    }
}

// Create a singleton instance
const cacheService = new CacheService();

export {
    cacheService
};