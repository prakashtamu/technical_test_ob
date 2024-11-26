// src/routes/recommendations.ts
import { generateRecommendations } from "@/controllers/recommendations-controller";
import { Router } from "express";

const router = Router();

router.post("/", generateRecommendations);

export default router;
