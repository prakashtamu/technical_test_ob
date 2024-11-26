// src/controllers/usersController.ts

import RecommendationModel from "@/models/recommendation";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUserRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    const result = await RecommendationModel.findOne({
      user_id,
    });
    if (result) {
      return res.status(200).json({
        user_id,
        recommendations: result.recommendations,
      });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No recommendations found for user_id ${user_id}.` });
    }
  } catch (error) {
    next(error);
  }
};
