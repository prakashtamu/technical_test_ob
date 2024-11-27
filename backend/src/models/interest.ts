// src/models/interest.ts
import mongoose from "mongoose";
const { Schema, model } = mongoose;
// TODO: Define the Mongoose schema and model for storing interests.

const interestSchema = new Schema({
  user_id: String,
  interests: [{ type: String }],
});

const InterestModel = model("interest", interestSchema);

export default InterestModel;
