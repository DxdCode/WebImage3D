import express from "express";
import multer from "multer";
import { uploadImage, getImages, getOneImage } from "../controllers/imageController.js";

const router = express.Router();

export const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getOneImage);

export default router;
