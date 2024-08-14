import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
     AddNewCategory,
     CreateVariation,
     DeleteCategory,
     EditCategory,
     GetAllCategories,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/create-new-category", protect, upload.single("categoryThumbnail"), AddNewCategory);
router.get("/get-all-categories", protect, GetAllCategories);
router.delete("/delete-category", protect, DeleteCategory);
router.put("/edit-category", protect, upload.single("categoryThumbnail"), EditCategory);
router.post("/create-variation", protect, CreateVariation);

export default router;