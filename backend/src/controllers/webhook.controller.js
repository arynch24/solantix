import { asyncHandler } from '../utils/asyncHandler.js';
import fs from "fs";
import { User } from '../models/user.model.js';
import pkg from "pg";

// Services
import { databaseService } from '../services/database.service.js';
import {cacheService} from '../services/cache.service.js';
import { batchService } from '../services/batch.service.js';

const { Pool } = pkg;

const processNftPrices = asyncHandler(async (req, res) => {
    console.log('[Info] Processing NFT prices webhook');

    res.status(200).json({ message: 'Webhook received successfully' });


    const { body } = req;
    const type = body[0].type;

    if (!type || type !== "NFT_LISTING" && type !== "NFT_SALE") {
        return res.status(400).json({ message: 'Unknown webhook data' });
    }
    // Retrieve all the users from the database whose indexingCategories include "NFT_PRICES"
    const users = await User.find({ indexingCategories: "NFT_PRICES" });
    if (!users || users.length === 0) {
        console.log('[Error] No users found for NFT_PRICES category');
        return;
    }

    let transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace;

    transaction_id =  body[0]?.signature;
    transaction_type =  body[0]?.type;
    nft_address =  body[0]?.events?.nft?.nfts[0]?.mint;
    seller_address =  body[0]?.events?.nft?.seller;
    buyer_address =  body[0]?.events?.nft?.buyer;
    price_amount =  (body[0]?.events?.nft?.amount || 0) / 1000000000;

    // Get collection name from cache or API
    nft_collection = await cacheService.getNftCollection(nft_address);


    if (type === "NFT_LISTING") {
        marketplace =  body[0]?.source;
    }
    else if (type === "NFT_SALE") {
        marketplace = body[0]?.events?.nft?.source;
    }

    // Prepare data object to be added to buffer
    const nftPriceData = {
        transaction_id,
        transaction_type,
        nft_address,
        nft_collection,
        seller_address,
        buyer_address,
        price_amount,
        marketplace
    };



    

    console.log('[Info] Users found for NFT_PRICES category:', users.length);

    // Iterate through each user and save the data to their respective database
    // for (const user of users) {
    //     const postgresConfig = user.postgresConfig;
    //     const pool = new Pool(postgresConfig);

    //     try {
    //         // Insert the data into the user's database
    //         await pool.query(
    //             `INSERT INTO nft_prices (transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    //             [transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace]
    //         );
    //         console.log(`[Info] Data saved successfully for user ${user.githubId}`);
    //     } catch (error) {
    //         console.error(`[Error] Failed to save data for user ${user.githubId}:`, error.message);
    //     } finally {
    //         await pool.end(); // Close the connection pool
    //     }
    // }

    
    console.log(`[Info] Adding data to buffers for ${users.length} users`);
    for (const user of users) {
      batchService.addToBuffer(user.githubId, "NFT_PRICES", nftPriceData);
    }

    console.log('[Info] NFT prices webhook processed successfully');
    res.status(200).json({ message: 'Webhook received successfully' });
});


/**
 * 
*/
const processNftBids = asyncHandler(async (req, res) => {
    const { body } = req;
    const jsonData = JSON.stringify(body, null, 2);
    console.log('[Info] Processing NFT bids webhook');
    
    fs.appendFile('logs/nft_bids.log', jsonData + ',\n', (err) => {
        if (err) console.error('Error saving webhook response:', err);
    });
});

const processTokenPrices = asyncHandler(async (req, res) => {
    const { body } = req;
    const jsonData = JSON.stringify(body, null, 2);
    console.log("[Info] processing token prices webhook");

    fs.appendFile('logs/token_prices.log', jsonData + ',\n', (err) => {
        if (err) console.error('Error saving webhook response:', err);
    });
})

const processTokenLoans = asyncHandler(async (req, res) => {
    const { body } = req;
    const jsonData = JSON.stringify(body, null, 2);
    console.log("[Info] processing token loans webhook");

    fs.appendFile('logs/token_loans.log', jsonData + ',\n', (err) => {
        if (err) console.error('Error saving webhook response:', err);
    });
})
export {
    processNftPrices,
    processNftBids,
    processTokenPrices, 
    processTokenLoans
};


