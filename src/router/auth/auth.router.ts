import { Router } from "express";
import authController from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/login", authController.login);

export default AuthRouter;
