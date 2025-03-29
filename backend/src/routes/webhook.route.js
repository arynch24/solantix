import { Router } from "express";
import { processNftPrices } from "../controllers/webhook.controller.js";

const route = Router();

route.post("/nft-prices", processNftPrices);
export default route;