import { Router } from "express";
import { processNftPrices, processNftBids, processTokenPrices, processTokenLoans } from "../controllers/webhook.controller.js";

const route = Router();

route.post("/nft-prices", processNftPrices);
route.post("/nft-bids", processNftBids);
route.post("/token-prices", processTokenPrices);
route.post("/token-loans", processTokenLoans);

export default route;