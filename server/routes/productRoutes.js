import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
     AddNewCategory,
     DeleteCategory,
     EditCategory,
     GetAllCategories,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/create-new-category", protect, upload.single("categoryThumbnail"), AddNewCategory);
router.get("/get-all-categories", protect, GetAllCategories);
router.delete("/delete-category", protect, DeleteCategory);
router.put("/edit-category", protect, upload.single("categoryThumbnail"), EditCategory);

export default router;