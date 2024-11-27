// src/controllers/recommendationsController.ts
import interestModel from "@/models/interest";
import RecommendationModel from "@/models/recommendation";
import axiosInstance from "@/utils/axiosInstance";
import Logger from "@/utils/logger";
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

    // save the user's interests
    await interestModel.create({
      user_id,
      interests: preferences,
    });

    // generate recommendations from llm
    await axiosInstance
      .post("/llm/generate", {
        user_id,
        preferences,
      })
      .then(async (response) => {
        if (response.status === 200) {
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
        }
      })
      .catch((error) => {
        Logger.error(
          "Encountered an error",
          JSON.stringify(error, undefined, 2)
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Please use the valid preferences",
        });
      });
  } catch (error) {
    next(error);
  }
};
