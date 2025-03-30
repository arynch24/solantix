import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import pkg from "pg";

const { Pool } = pkg;


const getNftPrices = async (pool, nftAddress) => { 
    if (!nftAddress) {
        // send all the data from the database
        const query = `SELECT * FROM nft_prices`;
        const { rows } = await pool.query(query);
        return rows;
    }

    // send the data for the specific nft address from the database
    const query = `SELECT * FROM nft_prices WHERE nft_address = $1`;
    const values = [nftAddress];
    const { rows } = await pool.query(query, values);
    return rows;
}


/**
 * function to fetch NFT prices from the database
 */
const getNftData = asyncHandler(async (req, res) => {
    try {
        const { githubId, nftAddress, category } = req.query;
        const user = await User.findOne({ githubId });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
            
        const postgresConfig = user.postgresConfig;
        const pool = new Pool(postgresConfig);

        if (category === "NFT_PRICES") {
            const data = await getNftPrices(pool, nftAddress);
            return res.status(200).json(new ApiResponse(200, data, "NFT prices fetched successfully"));
        }
        
    } catch (error) {
        console.error("[Error] Failed to fetch NFT data", error.message);
        return res.status(500).json(new ApiError(500, error.message, error));
    }
})


export {
    getNftData
}