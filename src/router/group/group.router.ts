import { Router } from "express";
import { jwtAuthenticate } from "../../passport";
import groupController from "./group.controller";

const GroupRouter = Router();

GroupRouter.post("/", jwtAuthenticate, groupController.createGroup);
GroupRouter.get("/", jwtAuthenticate, groupController.readGroups);
GroupRouter.get("/getGroupsCount", jwtAuthenticate, groupController.getGroupsCount);
GroupRouter.get("/:_id", jwtAuthenticate, groupController.readGroup);
GroupRouter.get("/:_id/getMember", jwtAuthenticate, groupController.readGroupMember);
GroupRouter.post("/:_id/joinGroup", jwtAuthenticate, groupController.joinGroup);

export default GroupRouter;
