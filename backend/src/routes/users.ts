// src/routes/users.ts

import { getUserRecommendations } from "@/controllers/users-controller";
import { Router } from "express";

const router = Router();

/**
 * TODO: Set up the `/users/:userRef/recommendations` GET route.
 *
 * Steps:
 * 1. Use the `getUserRecommendations` controller to handle the request.
 * 2. Ensure the `userRef` parameter is extracted correctly.
 * 3. Handle any errors appropriately.
 *
 * Hints:
 * - No additional validation middleware is required unless you want to validate `userRef`.
 */

// Example (from a different context):

router.get("/:user_id/recommendations", getUserRecommendations);

export default router;
