import axios from 'axios';
import { webhookConfigs } from '../config/webhookconfig.js';

// Track created webhooks
let createdWebhooks = {};

let categoryMap = {
    "NFT_PRICES": "nft-prices",
    "NFT_BIDS": "nft-bids",
};


/**
 * Initialize all shared webhooks
 */
async function initializeWebhooks() {
    console.log('[Info] Initializing shared category webhooks');

    const webhookCategories = Object.entries(webhookConfigs);
    if (webhookCategories.length === 0) {
        console.log('[Warning] No webhooks to initialize');
        return;
    }

    for (const [category, config] of webhookCategories) {
        console.log(`[Info] Creating webhook for category: ${category}`);
        try {
            // Check if webhook already exists
            const existingWebhook = await checkWebhookExists(categoryMap[category]);  // remaining
            
            if (existingWebhook) {
                console.log(`[Message] Webhook for category ${category} already exists, skipping creation`);
                createdWebhooks[category] = existingWebhook;
                continue;
            }
            
            // Create the webhook
            const webhook = await createHeliusWebhook(config);
            createdWebhooks[category] = webhook;
            console.log(webhook);
            
            console.log(`[Info] Created webhook for category ${category} with ID: ${webhook?.webhookID}`);
        } catch (error) {
            console.error(`Failed to create webhook for category ${category}:`, error.message);
            throw error; // Rethrow to prevent server start if critical
        }
    }

    console.log('All category webhooks initialized successfully');
    return createdWebhooks;
}

/**
 * Create a new webhook with Helius
 */
async function createHeliusWebhook(config) {
    console.log("[Info] Creating webhook");
    
  

    const response = await fetch(`https://api.helius.xyz/v0/webhooks?api-key=${process.env.HELIUS_API_KEY}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
            config
        )
    });
    
    const data = await response.json();
    
    
    console.log("[Info] Helius webhook created successfully");
    
    return data;
}

/**
 * Check if a webhook already exists for a category
 */
async function checkWebhookExists(category) {
    try {
        
        const response = await axios.get('https://api.helius.xyz/v0/webhooks', {
            params: { "api-key": process.env.HELIUS_API_KEY }
        });
        
     

        return response.data.find(webhook =>
            webhook.webhookURL.includes(`/webhook/${category.toLowerCase()}`)
        );
        return null;
    } catch (error) {
        console.error('Error checking existing webhooks:', error.message);
        return null;
    }
}

export {
    initializeWebhooks,
};