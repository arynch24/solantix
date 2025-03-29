import { Router } from "express";
import { addCredentials, verifyCredentials } from "../controllers/user.controller.js";
        
const router = Router();

router.route("/addCredentials").post(addCredentials);
router.route("/verifyCredentials/:githubId").get(verifyCredentials);

export default router