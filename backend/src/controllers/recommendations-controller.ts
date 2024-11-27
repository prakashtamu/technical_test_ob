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
    await interestModel.findOneAndUpdate(
      { user_id },
      {
        user_id,
        interests: preferences,
      },
      {
        upsert: true,
      }
    );

    // generate recommendations from llm
    await axiosInstance
      .post("/llm/generate", {
        user_id,
        preferences,
      })
      .then(async (response) => {
        if (response.status === 200) {
          // store the generated recommendations in the database
          await RecommendationModel.findOneAndUpdate(
            { user_id },
            {
              user_id,
              recommendations: response.data.recommendations,
            },
            {
              upsert: true,
            }
          );

          // return the generated recommendations
          return res.status(StatusCodes.OK).json({
            user_id: req.body.user_id,
            recommendations: response.data.recommendations,
          });
        }
      })
      .catch(async () => {
        Logger.error("Error generating recommendations");
        await RecommendationModel.findOneAndUpdate(
          { user_id },
          {
            user_id,
            recommendations: [],
          },
          {
            upsert: true,
          }
        );
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "Your preferences yielded no recommendations. We have saved your preferences though.",
        });
      });
  } catch (error) {
    next(error);
  }
};
