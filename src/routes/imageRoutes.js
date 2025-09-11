import express from "express";
import multer from "multer";
import { uploadImage, getImages, getOneImage } from "../controllers/imageController.js";
import { generarmodelo3D } from "../controllers/imagen3dController.js";

const router = express.Router();

export const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getOneImage);
router.post("/generate/:id",generarmodelo3D)
export default router;
