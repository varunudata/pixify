import express from "express";
import { generateImage } from "../controllers/imageController.js";
import userAuth from "../middleWares/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate-image", userAuth, generateImage);

export default imageRouter;
