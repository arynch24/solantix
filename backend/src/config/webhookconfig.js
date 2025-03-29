// Webhook base URL for receiving the data

const WEBHOOK_BASE_URL = process.env.WEBHOOK_BASE_URL || "https://localhost:5000/api/webhook";

// Define webhook configurations for each category
const webhookConfigs = {
    // "NFT_BIDS": {
    //   webhookURL: `${WEBHOOK_BASE_URL}/nft-bids`,
    //   transactionTypes: ["NFT_BID", "NFT_GLOBAL_BID", "NFT_AUCTION_CREATED", "NFT_AUCTION_UPDATED"],
    //   accountAddresses: [
    //     "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K", // Magic Eden
    //     "TSWAPaqyCSx2KABk68Shrw8burn8eqf8TcpzYoW5jZR"  // Tensor
    //   ],
    //   webhook: {
    //     includeMetadata: true,
    //     includeTokenBalances: true
    //   }
    // },
    "NFT_PRICES": {
        "webhookURL": `${WEBHOOK_BASE_URL}/nft-prices`,
        "transactionTypes": ["NFT_LISTING", "NFT_SALE"],
        "accountAddresses": [
            "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",   // Magic Eden
            "TSWAPaqyCSx2KABk68Shrw8burn8eqf8TcpzYoW5jZR"    // Tensor
        ],
        "webhookType": "enhanced",
        "txnStatus": "all",
        "authHeader": `Bearer ${process.env.HELIUS_API_KEY}`,
    },

};

export {
    webhookConfigs,
};