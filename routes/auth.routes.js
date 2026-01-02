import { Router } from "express";
import { signIn, singUp, signOut } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/sign-up", singUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
