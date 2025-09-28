import express from "express";
import multer from "multer";
import { uploadImage, getImages, getOneImage } from "../controllers/imageController.js";
import { generarModelo3D } from "../controllers/imagen3dController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkUploadLimit,checkModelLimit } from "../middlewares/checkIpBlock.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.post("/", checkUploadLimit, upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getOneImage);
router.post("/generate/:id",checkModelLimit, generarModelo3D);

export default router;
