import { Router } from "express";
import { jwtAuthenticate } from "../../passport";
import placeController from "./place.controller";

const PlaceRouter = Router();

export default PlaceRouter;
