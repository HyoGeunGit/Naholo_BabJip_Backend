import { Router } from "express";
import authController from "./auth.controller";
import { jwtAuthenticate } from "../../passport";

const AuthRouter = Router();

AuthRouter.post("/login", authController.login);
AuthRouter.post("/getProfile", jwtAuthenticate, authController.getProfile);

export default AuthRouter;
