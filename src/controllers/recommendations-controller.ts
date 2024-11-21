// src/controllers/recommendationsController.ts
import RecommendationModel from "@/models/recommendation";
import axiosInstance from "@/utils/axiosInstance";
import { RecommendationValidator } from "@/validators/recommendation.validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const generateRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implement recommendation generation logic here
  try {
    const { user_id, preferences } = RecommendationValidator.parse(req.body);
    const response = await axiosInstance.post("/llm/generate", {
      user_id,
      preferences,
    });
    // store the generated recommendations in the database
    await RecommendationModel.create({
      user_id,
      recommendations: response.data.recommendations,
    });

    // return the generated recommendations
    return res.status(StatusCodes.OK).json({
      user_id: req.body.user_id,
      recommendations: response.data.recommendations,
    });
  } catch (error) {
    next(error);
  }
};
