import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createNftPricingSchema } from "../models/userSchemaHelper.js";
import pkg from "pg";

const { Pool } = pkg;

/**
 * function to verify the postgres credentials
 * @param {*} pool 
 * @returns 
 */
const verifyCredentialsHelper = async (pool) => {
    try {
        const client = await pool.connect();
        await client.query("SELECT 1");
        client.release();
        return true;
    } catch (error) {
        console.error("Error connecting to PostgreSQL:", error);
        return false;
    }
    // Removed pool.end() to prevent closing the pool prematurely
};


const addCredentials = asyncHandler(async (req, res) => {
    try {

        const { githubId, name, email, postgresConfig, indexingCategories } = req.body;
        console.log(postgresConfig);
        
        if (
            [githubId, email, name].some((field) => field?.trim() === "") ||
            !postgresConfig ||
            indexingCategories?.length === 0 
        ) {
            throw new ApiError(400, "All fields are required");
        }


        // Check if user already exists
        {
            const existedUser = await User.findOne({
                $or: [{ githubId }, { name }, { email }]
            });

            if (existedUser) {
                throw new ApiError(400, "User with githubId, email or name already exists");
            }
        }
        const postgresConfigWithoutDB = {
            host: postgresConfig.host,
            port: postgresConfig.port,
            user: postgresConfig.user,
            password: postgresConfig.password,
            database: "postgres", // Use the default 'postgres' database for connection testing
        };

        const pool = new Pool(postgresConfigWithoutDB);
        // Verify postgres credentials
        const isValid = await verifyCredentialsHelper(pool);

        if (!isValid) {
            throw new ApiError(400, "Invalid PostgreSQL credentials");
        }

        // check if the database exists
        const client = await pool.connect();
        const dbExists = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [postgresConfig.database]
        );
        if (dbExists.rowCount === 0) {
            // If the database does not exist, create it
            await client.query(`CREATE DATABASE ${postgresConfig.database}`);
        }
        client.release();
    
        // Create new user
        const newUser = new User({
            githubId,
            name,
            email,
            postgresConfig,
            isValid: true,
            indexingCategories,
        });

        await newUser.save();
        console.log("[Info] User created successfully", newUser);
        console.log("[Info] Creating schema");

        // Create necessary schema for user
        indexingCategories.forEach((category) => {
            
            switch (category) {
                case "NFT_PRICES":
                    const result = createNftPricingSchema(new Pool(postgresConfig), githubId);
                    if (!result) {
                        console.error(`[Error] Failed to create schema for category: ${category} we'll retry later`);      
                    }
                    break;
                // Add more cases for other categories as needed
                default:
                    console.log(`[Warning] No schema creation logic for category: ${category}`);
            }
            
        });
        
        // Send response
        res.status(201).json(
            new ApiResponse(201, "User created successfully", newUser)
        );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
    // Removed pool.end() here as well to allow reusing the pool
})

const verifyCredentials = asyncHandler(async (req, res) => {
    try {
        const { githubId } = req.params;
        
        // find postgres config of the user by githubId

        const result = await User.findOne({
            githubId
        });

        console.log("[Info] result", result);
        
        if (!result) {
            throw new ApiError(400, "User not found");
        }

        const postgresConfig = result.postgresConfig;
        if (!postgresConfig) {
            throw new ApiError(400, "Postgres config not found");
        }
        const pool = new Pool(postgresConfig);
        // Verify postgres credentials
        const isValid = await verifyCredentialsHelper(pool);
        if (!isValid) {
            throw new ApiError(400, "Invalid PostgreSQL credentials");
        }

        res.status(200).json(new ApiResponse(200, "Valid PostgreSQL credentials"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})
export {
    addCredentials,
    verifyCredentials
}