
const createNftPricingSchema = async (pool, userId) => {
    const schemaName = `${userId}_nft_pricing`;
    const query = `
    CREATE TABLE IF NOT EXISTS nft_prices (
        id SERIAL PRIMARY KEY,
        transaction_id VARCHAR(88) NOT NULL UNIQUE,
        transaction_type VARCHAR(30) NOT NULL, -- NFT_LISTING, NFT_SALE, etc.
        nft_address VARCHAR(44) NOT NULL,      -- Mint address of the NFT
        nft_collection VARCHAR(100),           -- Collection name if available
        seller_address VARCHAR(44),            -- Address of the seller/lister
        buyer_address VARCHAR(44),             -- Address of the buyer (for sales)
        price_amount NUMERIC(20, 9) NOT NULL,  -- Amount in SOL or tokens
        marketplace VARCHAR(50)       -- Platform where listed/sold
            );
        `;
        
    const indexQueries = [
        `CREATE INDEX IF NOT EXISTS idx_nft_address ON nft_prices(nft_address);`,
        `CREATE INDEX IF NOT EXISTS idx_transaction_type ON nft_prices(transaction_type);`,
        `CREATE INDEX IF NOT EXISTS idx_collection ON nft_prices(nft_collection);`,
    ];

    try {
        await pool.query(query);
        console.log(`[Info] Created NFT pricing schema for user ${userId}`);
        for (const indexQuery of indexQueries) {
            await pool.query(indexQuery);
            console.log(`✅ Index created: ${indexQuery}`);
        }
        return true;
    } catch (error) {
        console.error(`[Error] Failed to create NFT pricing schema for user ${userId}:`, error.message);
        return false;
    }
};


export {
    createNftPricingSchema,
}
