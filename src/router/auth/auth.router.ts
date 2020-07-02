import { Router } from "express";
import authController from "./auth.controller";
import { jwtAuthenticate } from "../../passport";

const AuthRouter = Router();

AuthRouter.post("/signin", authController.signin);
AuthRouter.post("/signup", authController.signup);
AuthRouter.post("/getProfile", jwtAuthenticate, authController.getProfile);

export default AuthRouter;
