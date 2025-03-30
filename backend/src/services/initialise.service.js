import { databaseService } from '../services/database.service.js';
import { cacheService } from '../services/cache.service.js';
import { batchService } from '../services/batch.service.js';
import mongoose from 'mongoose';

// Initialize services at application startup
async function initializeServices() {
    try {
        // Initialize database service first
        await databaseService.initialize();
        console.log('[Info] Database service initialized');

        // Initialize batch service
        batchService.initialize();
        console.log('[Info] Batch service initialized');

        // Initialize cache service
        cacheService.initialize();
        console.log('[Info] Cache service initialized');

        console.log('[Info] All services initialized successfully');
    } catch (error) {
        console.error('[Error] Failed to initialize services:', error);
        process.exit(1);
    }
}


async function gracefulShutdown() {
    console.log('[Info] Shutting down gracefully...');
    
    try {
      // Cleanup services
      await Promise.all([
        batchService.cleanup(),
        cacheService.cleanup(),
        databaseService.closeAllConnections()
      ]);
      
      // Close MongoDB connection
      await mongoose.connection.close();
      console.log('[Info] MongoDB connection closed');
      
      console.log('[Info] Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('[Error] Error during graceful shutdown:', error);
      process.exit(1);
    }
}

export { 
    initializeServices, 
    gracefulShutdown 
};