import { Router } from "express";
import { jwtAuthenticate } from "../../passport";
import storyController from "./story.controller";

const StoryRouter = Router();

export default StoryRouter;
