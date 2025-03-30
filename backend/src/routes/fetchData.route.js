import { Router } from "express";
import { getNftData } from "../controllers/fetchData.controller.js";

const router = Router();

router.route("/getNftData").get(getNftData);

export default router;