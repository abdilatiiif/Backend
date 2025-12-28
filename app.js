import express from "express";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import conncectToDatabase from "./database/mongodb.js";

const app = express();

console.log("App is starting...");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Velkommen til subscription service !");
});

app.listen(PORT, async () => {
  console.log(`Sub tracker running on http://localhost:${PORT}`);
  await conncectToDatabase();
});

export default app;
