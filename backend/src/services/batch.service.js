import { databaseService } from './database.service.js';

class BatchService {
    constructor() {
        this.buffers = {};
        this.BATCH_SIZE = 100;
        this.FLUSH_INTERVAL = 5000; // 5 seconds
        this.flushIntervalId = null;
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;

        // Start the interval to flush buffers periodically
        this.flushIntervalId = setInterval(() => this.flushAllBuffers(), this.FLUSH_INTERVAL);
        this.initialized = true;
        console.log('[Info] Batch service initialized');

        // Setup process termination handlers
        process.on('SIGTERM', () => this.cleanup());
        process.on('SIGINT', () => this.cleanup());
    }

    setupBufferForUser(userId, category) {
        const bufferKey = `${userId}_${category}`;
        if (!this.buffers[bufferKey]) {
            this.buffers[bufferKey] = [];
            console.log(`[Info] Setup buffer for user ${userId} and category ${category}`);
        }
    }

    addToBuffer(userId, category, data) {
        const bufferKey = `${userId}_${category}`;
        
        // Create buffer if it doesn't exist
        if (!this.buffers[bufferKey]) {
            this.setupBufferForUser(userId, category);
        }

        // Add data to buffer
        this.buffers[bufferKey].push(data);

        // Flush if buffer reaches threshold
        if (this.buffers[bufferKey].length >= this.BATCH_SIZE) {
            this.flushBuffer(userId, category);
        }
    }

    async flushBuffer(userId, category) {
        const bufferKey = `${userId}_${category}`;
        const buffer = this.buffers[bufferKey];

        if (!buffer || buffer.length === 0) return;

        // Clone and clear the buffer immediately to prevent data loss if flush fails
        const dataToFlush = [...buffer];
        this.buffers[bufferKey] = [];

        console.log(`[Info] Flushing ${dataToFlush.length} records for user ${userId} (${category})`);

        try {
            switch (category) {
                case 'NFT_PRICES':
                    await this.flushNftPrices(userId, dataToFlush);
                    break;
                // case 'NFT_BIDS':
                //   await this.flushNftBids(userId, dataToFlush);
                //   break;
                // case 'TOKEN_LOANS':
                //   await this.flushTokenLoans(userId, dataToFlush);
                //   break;
                case 'TOKEN_PRICES':
                    await this.flushTokenPrices(userId, dataToFlush);
                    break;
                default:
                    console.error(`[Error] Unknown category: ${category}`);
            }

            console.log(`[Info] Successfully flushed buffer for user ${userId} (${category})`);
        } catch (error) {
            console.error(`[Error] Failed to flush buffer for user ${userId} (${category}):`, error);

            // In case of error, we could implement a retry mechanism or dead letter queue
            // For now, just log the error and continue
        }
    }

    async flushNftPrices(userId, dataToFlush) {
        console.log(`[Debug] Flushing ${dataToFlush.length} NFT price records for user ${userId}`);
        await databaseService.executeTransaction(userId, async (client) => {
            const query = `
            INSERT INTO nft_prices 
            (transaction_id, transaction_type, nft_address, nft_collection, 
            seller_address, buyer_address, price_amount, marketplace) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

            for (const item of dataToFlush) {
                await client.query(query, [
                    item.transaction_id,
                    item.transaction_type,
                    item.nft_address,
                    item.nft_collection,
                    item.seller_address,
                    item.buyer_address,
                    item.price_amount,
                    item.marketplace
                ]);
            }
        });
    }

    // Similar implementation for other categories
    //   async flushNftBids(userId, dataToFlush) {
    //     // Implement similarly to flushNftPrices but with appropriate fields
    //     console.log(`[Info] Would flush NFT_BIDS for ${userId} (not implemented yet)`);
    //   }

    //   async flushTokenLoans(userId, dataToFlush) {
    //     // Implement similarly to flushNftPrices but with appropriate fields
    //     console.log(`[Info] Would flush TOKEN_LOANS for ${userId} (not implemented yet)`);
    //   }

    // remaining implementations 
    async flushTokenPrices(userId, dataToFlush) {
        // Implement similarly to flushNftPrices but with appropriate fields
        console.log(`[Info] Would flush TOKEN_PRICES for ${userId} (not implemented yet)`);
    }

    flushAllBuffers() {
        Object.keys(this.buffers).forEach(bufferKey => {
            const [userId, category] = bufferKey.split('_');
            this.flushBuffer(userId, category);
        });
    }

    cleanup() {
        if (this.flushIntervalId) {
            clearInterval(this.flushIntervalId);
            this.flushIntervalId = null;
        }

        // Flush all buffers one last time before shutting down
        this.flushAllBuffers();
        this.initialized = false;
        console.log('[Info] Batch service cleaned up');
    }
}

// Create a singleton instance
const batchService = new BatchService();

export {
    batchService
};