// src/models/Recommendation.ts
import mongoose from "mongoose";
const { Schema, model } = mongoose;
// TODO: Define the Mongoose schema and model for storing recommendations.

const recommendationSchema = new Schema({
  user_id: String,
  recommendations: [{ type: String }],
});

const RecommendationModel = model("Recommendation", recommendationSchema);

export default RecommendationModel;
