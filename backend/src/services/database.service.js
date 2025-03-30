import pkg from "pg";
import User from "../models/user.model.js";

const { Pool } = pkg;
class DatabaseService {
  constructor() {
    this.userPools = {};
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Find all users that need database connections
      const users = await User.find({
        $or: [
          { indexingCategories: "NFT_PRICES" },
          { indexingCategories: "NFT_BIDS" },
          { indexingCategories: "TOKEN_LOANS" },
          { indexingCategories: "TOKEN_PRICES" }
        ]
      });

      // Create a pool for each user
      for (const user of users) {
        if (user.postgresConfig) {
          this.userPools[user.githubId] = new Pool(user.postgresConfig);
          console.log(`[Info] Initialized pool for user ${user.githubId}`);
        }
      }

      this.initialized = true;
      console.log(`[Info] Database service initialized with ${Object.keys(this.userPools).length} connection pools`);
    } catch (error) {
      console.error('[Error] Failed to initialize database service:', error);
      throw error;
    }
  }

  async getPool(userId) {
    if (!this.userPools[userId]) {
      // Try to create the pool if it doesn't exist
      try {
        const user = await User.findOne({ githubId: userId });
        if (user && user.postgresConfig) {
          this.userPools[userId] = new Pool(user.postgresConfig);
          console.log(`[Info] Created new pool for user ${userId}`);
        } else {
          throw new Error(`User ${userId} not found or missing Postgres config`);
        }
      } catch (error) {
        console.error(`[Error] Failed to create pool for user ${userId}:`, error);
        throw error;
      }
    }
    return this.userPools[userId];
  }

  async executeQuery(userId, query, params) {
    const pool = await this.getPool(userId);
    try {
      const result = await pool.query(query, params);
      return result;
    } catch (error) {
      console.error(`[Error] Query execution failed for user ${userId}:`, error);
      throw error;
    }
  }

  async executeTransaction(userId, queryFn) {
    const pool = await this.getPool(userId);
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await queryFn(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`[Error] Transaction failed for user ${userId}:`, error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Cleanup method to close all connections on application shutdown
  async closeAllConnections() {
    console.log('[Info] Closing all database connections...');
    
    const closingPromises = Object.entries(this.userPools).map(async ([userId, pool]) => {
      try {
        await pool.end();
        console.log(`[Info] Closed pool for user ${userId}`);
      } catch (error) {
        console.error(`[Error] Failed to close pool for user ${userId}:`, error);
      }
    });
    
    await Promise.all(closingPromises);
    this.userPools = {};
    this.initialized = false;
    console.log('[Info] All database connections closed');
  }

  // Method to refresh pools when user configs change
  async refreshUserPool(userId, postgresConfig) {
    if (this.userPools[userId]) {
      try {
        await this.userPools[userId].end();
        console.log(`[Info] Closed existing pool for user ${userId}`);
      } catch (error) {
        console.error(`[Error] Failed to close existing pool for user ${userId}:`, error);
      }
    }
    
    this.userPools[userId] = new Pool(postgresConfig);
    console.log(`[Info] Refreshed pool for user ${userId}`);
  }
}

// Create a singleton instance
const databaseService = new DatabaseService();

export {
    databaseService
};