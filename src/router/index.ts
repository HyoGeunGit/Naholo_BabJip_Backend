import { Router } from "express";
import AuthRouter from "./auth/auth.router";
import GroupRouter from "./group/group.router";
import PlaceRouter from "./place/place.router";
import StoryRouter from "./story/story.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/group", GroupRouter);
router.use("/place", PlaceRouter);
router.use("/story", StoryRouter);

export default router;
