import express from "express";
import bodyParser from "body-parser";
import recommendationsRouter from "@/routes/recommendations";
import usersRouter from "@/routes/users";
import Errorhandler from "@/middleware/error-handler";
import { initializeDatabase } from "@/utils/database";

const app = express();
app.use(bodyParser.json());
app.use("/recommendations", recommendationsRouter);
app.use("/users", usersRouter);
app.use(Errorhandler);
initializeDatabase();

export default app;
