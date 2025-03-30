import express from "express";
import cors from "cors";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

// url encoded data
app.use(express.urlencoded({
    extended: true,
    limit: "500kb" 
}));

// Limit the size of the request body to 20kb
app.use(express.json({
    limit: "500kb"
}));


// Routing
import userRoute from "./routes/user.route.js";
import webhookRoute from "./routes/webhook.route.js";
import fetchDataRoute from "./routes/fetchData.route.js";

// Webhook route
app.use("/api/webhook", webhookRoute);

// User route
app.use("/api/user", userRoute);

// Api for giving data to the frontend for dashboard
app.use("/api/fetchData", fetchDataRoute);
export default app;