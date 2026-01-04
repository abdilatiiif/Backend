import express from "express";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import conncectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// expres middleware
app.use(express.json()); // allow to parse json request body
app.use(express.urlencoded({ extended: false })); // helps to prosess form data
app.use(cookieParser()); // remember to import it - reads cookies and makes them available in req.cookies
app.use(arcjetMiddleware);

console.log("App is starting...");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// middleware for handling errors
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Velkommen til subscription service !");
});

app.listen(PORT, async () => {
  console.log(`Sub tracker running on http://localhost:${PORT}`);
  await conncectToDatabase();
});

export default app;
