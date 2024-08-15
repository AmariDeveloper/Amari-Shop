import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
     AddNewCategory,
     CreateVariation,
     DeleteCategory,
     DeleteVariation,
     EditCategory,
     EditVariation,
     GetAllCategories,
     GetAllVariations,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/create-new-category", protect, upload.single("categoryThumbnail"), AddNewCategory);
router.get("/get-all-categories", protect, GetAllCategories);
router.delete("/delete-category", protect, DeleteCategory);
router.put("/edit-category", protect, upload.single("categoryThumbnail"), EditCategory);
router.post("/create-variation", protect, CreateVariation);
router.get("/get-all-variations", protect, GetAllVariations);
router.delete("/delete-variation", protect, DeleteVariation);
router.put("/edit-variation", protect, EditVariation);

export default router;