// Webhook base URL for receiving the data

const WEBHOOK_BASE_URL = process.env.WEBHOOK_BASE_URL || "https://localhost:5000/api/webhook";

// Define webhook configurations for each category
const webhookConfigs = {
    // "NFT_BIDS": {
    //   "webhookURL": `${WEBHOOK_BASE_URL}/nft-bids`,
    //   "transactionTypes": ["NFT_BID", "NFT_GLOBAL_BID", "NFT_AUCTION_CREATED", "NFT_AUCTION_UPDATED"],
    //   "accountAddresses": [
    //     "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K", // Magic Eden
    //     "TSWAPaqyCSx2KABk68Shrw8burn8eqf8TcpzYoW5jZR",  // Tensor
    //     "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsodv8UbNKJTesg", // Hyperspace
    //     "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk", // Metaplex auction house
    //     "3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y", // Opensea
    //     "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz" // Solanartx
    //   ],
    //   "webhookType": "enhanced",
    //   "txnStatus": "all",
    //   "authHeader": `Bearer ${process.env.HELIUS_API_KEY_NFT_BID}`,
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
        "authHeader": `Bearer ${process.env.HELIUS_API_KEY_NFT_PRICES}`,
    },


    // "TOKEN_PRICES":{
    //     "webhookURL": `${WEBHOOK_BASE_URL}/token-prices`,
    //     "transactionTypes": [
    //       "SWAP",                // Recent swap transactions with price information
    //       "DEPOSIT",             // May include token valuations
    //       "ADD_TO_POOL",         // Liquidity pool additions with pricing
    //       "CREATE_POOL",         // New pools with initial token prices
    //       "ADD_LIQUIDITY",       // Token price implied by liquidity ratio
    //       "LIST_ITEM",           // Tokens listed for sale with prices
    //       "BUY_ITEM",            // Completed purchases showing market value
    //       "CREATE_ORDER",        // New orders with token pricing
    //       "FILL_ORDER"           // Orders filled with token pricing
    //   ],
    //     "accountAddresses": [
    //         "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",   // Jupiter Aggregator
    //         "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",    // Raydium
    //         "LifrQWRUkqsJGXBs8twDMK5a9cDL3YEXS1UT9Zwz6vb",  // Lifnity  
    //     ],
    //     "webhookType": "enhanced",
    //     "txnStatus": "all",
    //     "authHeader": `Bearer ${process.env.HELIUS_API_KEY}`,
    // },

    // "TOKEN_LOANS": {
    //     "webhookURL": `${WEBHOOK_BASE_URL}/token-loans`,
    //     "transactionTypes": [
    //         "LOAN",
    //         "LOAN_FOX",
    //         "BORROW_FOX",
    //         "CREATE_ESCROW",
    //     ],
    //     "accountAddresses": [
    //         "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo",   // Solend
    //         "mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68",   // Mango Markets
    //         "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD",   // Mariande Finance
    //         "Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR",   // Port Finance
    //         "JPv1rCqrhagNNmJVM5J1he7msQ5ybtvE1nNuHpDHMNU",   // Jet Protocols
    //     ],
    //     "webhookType": "enhanced",
    //     "txnStatus": "all",
    //     "authHeader": `Bearer ${process.env.HELIUS_API_KEY_TOKEN_LOAN}`,
    // }

};

export {
    webhookConfigs,
};