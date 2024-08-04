import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
     AddNewCategory,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/create-new-category", protect, upload.single("categoryThumbnail"), AddNewCategory);

export default router;