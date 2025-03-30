import axios from 'axios';
import { webhookConfigs } from '../config/webhookconfig.js';

// Track created webhooks
let createdWebhooks = {};

let categoryMap = {
    "NFT_PRICES": "nft-prices",
    "NFT_BIDS": "nft-bids",
    "TOKEN_PRICES": "token-prices",
    "TOKEN_LOANS": "token-loans",
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

            const apiKey = config?.authHeader?.split(" ")[1];
            
            // Check if webhook already exists
            const existingWebhook = await checkWebhookExists(categoryMap[category], apiKey);  // remaining
            
            if (existingWebhook) {
                console.log(`[Message] Webhook for category ${category} already exists, skipping creation`);
                createdWebhooks[category] = existingWebhook;
                continue;
            }
            
            // Create the webhook
            const webhook = await createHeliusWebhook(config, apiKey);
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
async function createHeliusWebhook(config, apiKey) {
    try {
        console.log("[Info] Creating webhook");
        
      
    
        const response = await fetch(`https://api.helius.xyz/v0/webhooks?api-key=${apiKey}`, {
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
    } catch (error) {
        console.error('Error creating webhook:', error.message);
        return null;
    }
}

/**
 * Check if a webhook already exists for a category
 */
async function checkWebhookExists(category, apiKey) {
    try {
        const response = await axios.get('https://api.helius.xyz/v0/webhooks', {
            params: { "api-key": apiKey }
        });
        
     

        return response.data.find(webhook =>
            webhook.webhookURL.includes(`/webhook/${category.toLowerCase()}`)
        );
    } catch (error) {
        console.error('Error checking existing webhooks:', error.message);
        throw error;
    }
}

export {
    initializeWebhooks,
};