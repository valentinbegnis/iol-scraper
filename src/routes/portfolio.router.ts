import express from "express";
import { getPortfolioAssets } from "../controllers/portfolio.controller";

const router = express.Router();
router.get("/assets", getPortfolioAssets);

export default router;
