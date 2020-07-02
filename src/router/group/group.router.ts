import { Router } from "express";
import { jwtAuthenticate } from "../../passport";
import groupController from "./group.controller";

const GroupRouter = Router();

export default GroupRouter;
