import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/index.js";
import { initializeWebhooks } from "./services/webhook.service.js";
// import { initializeServices } from "./services/initialise.service.js";
// import { gracefulShutdown } from "./services/initialise.service.js";
import { cacheService } from "./services/cache.service.js";

dotenv.config({
    path: './.env'
});

async function startServer() {
    try {
        // Set up webhooks first
        await initializeWebhooks();
        cacheService.initialize(); // Initialize cache service

        // Then start all the services for user
        // await initializeServices();

        // Then start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at : http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize webhooks:', error.message);
        process.exit(1);
    }
}

connectDB()
    .then(
        () => {

            // Error handling for app:
            app.on("error", (error) => {
                console.log("App error", error);
                throw error;
            });

           startServer();
        }
    )
    .catch((error) => {
        console.log("MongoDB connection failed!!\n", error);
    });

// // Handle graceful shutdown
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGINT', gracefulShutdown);