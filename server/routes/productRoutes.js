import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
     AddNewCategory,
     CreateNewProduct,
     CreateVariation,
     DeleteCategory,
     DeleteVariation,
     EditCategory,
     EditProduct,
     EditVariation,
     GetAllCategories,
     GetAllProducts,
     GetAllVariations,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/create-new-product", protect, upload.array("productImages"), CreateNewProduct);
router.put("/edit-product", protect, upload.fields([
       { name: "mainImage", maxCount: 1},
       { name: "galleryImages", maxCount: 20}
]), EditProduct);
router.post("/create-new-category", protect, upload.single("categoryThumbnail"), AddNewCategory);
router.get("/get-all-products", GetAllProducts);
router.get("/get-all-categories", GetAllCategories);
router.delete("/delete-category", protect, DeleteCategory);
router.put("/edit-category", protect, upload.single("categoryThumbnail"), EditCategory);
router.post("/create-variation", protect, CreateVariation);
router.get("/get-all-variations", GetAllVariations);
router.delete("/delete-variation", protect, DeleteVariation);
router.put("/edit-variation", protect, EditVariation);

export default router;