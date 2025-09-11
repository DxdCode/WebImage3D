import express from "express";
import multer from "multer";
import { uploadImage, getImages } from "../controllers/imageController.js";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);

export default router;
