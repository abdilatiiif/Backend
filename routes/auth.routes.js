import { Router } from "express";
const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({ title: "User sign-up endpoint" });
});
authRouter.post("/sign-in", (req, res) => {
  res.send({ title: "User sign-in endpoint" });
});
authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "User sign-out endpoint" });
});

export default authRouter;
