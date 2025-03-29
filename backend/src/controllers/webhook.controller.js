import { asyncHandler } from '../utils/asyncHandler.js';
import fs from "fs";
import { User } from '../models/user.model.js';
import pkg from "pg";

const { Pool } = pkg;

const processNftPrices = asyncHandler(async (req, res) => {
    console.log('[Info] Processing NFT prices webhook');

    const { body } = req;
    const type = body[0].type;

    if (!type || type !== "NFT_LISTING" && type !== "NFT_SALE") {
        return res.status(400).json({ message: 'Unknown webhook data' });
    }

    let transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace;

    transaction_id =  body[0]?.signature;
    transaction_type =  body[0]?.type;
    nft_address =  body[0]?.events?.nft?.nfts[0]?.mint;
    seller_address =  body[0]?.events?.nft?.seller;
    buyer_address =  body[0]?.events?.nft?.buyer;
    price_amount =  (body[0]?.events?.nft?.amount || 0) / 1000000000;

    try {
        let collectionName = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${nft_address}`, {
            headers: { "Content-Type": "application/json" }
        });
        collectionName = await collectionName.json();
        nft_collection = collectionName?.name;
    } catch (error) {
        console.error(`[Error] Failed to fetch collection name for NFT address ${nft_address}:`, error.message);
        nft_collection = "Unknown Collection"; // Fallback value
    }


    if (type === "NFT_LISTING") {
        marketplace =  body[0]?.source;
    }
    else if (type === "NFT_SALE") {
        marketplace = body[0]?.events?.nft?.source;
    }


    // Retrieve all the users from the database whose indexingCategories include "NFT_PRICES"
    const users = await User.find({ indexingCategories: "NFT_PRICES" });
    if (!users || users.length === 0) {
        console.log('[Error] No users found for NFT_PRICES category');
        return;
    }

    console.log('[Info] Users found for NFT_PRICES category:', users.length);

    // Iterate through each user and save the data to their respective database
    for (const user of users) {
        const postgresConfig = user.postgresConfig;
        const pool = new Pool(postgresConfig);

        try {
            // Insert the data into the user's database
            await pool.query(
                `INSERT INTO nft_prices (transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [transaction_id, transaction_type, nft_address, nft_collection, seller_address, buyer_address, price_amount, marketplace]
            );
            console.log(`[Info] Data saved successfully for user ${user.githubId}`);
        } catch (error) {
            console.error(`[Error] Failed to save data for user ${user.githubId}:`, error.message);
        } finally {
            await pool.end(); // Close the connection pool
        }
    }

    console.log('[Info] NFT prices webhook processed successfully');    
    
    // fs.appendFile('logs/webhook_responses.log', jsonData + '\n', (err) => {
    //     if (err) console.error('Error saving webhook response:', err);
    // });
    res.status(200).json({ message: 'Webhook received successfully' });
});

export {
    processNftPrices
};