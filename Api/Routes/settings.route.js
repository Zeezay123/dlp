import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getSettings,getSection,updateSettings,updateSection,} from "../controllers/siteSettings.controller.js"


const router = express.Router();

// Public
router.get("/", getSettings);
router.get("/:section", getSection);

// Admin only
router.put("/", verifyToken, updateSettings);
router.put("/:section", verifyToken, updateSection);

export default router;
