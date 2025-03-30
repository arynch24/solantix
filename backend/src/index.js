import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/index.js";
import { initializeWebhooks } from "./services/webhook.service.js";


dotenv.config({
    path: './.env'
});

async function startServer() {
    try {
        // Set up webhooks first
        await initializeWebhooks();

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
