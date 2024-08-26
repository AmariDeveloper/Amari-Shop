import express from "express";
import { GetAllPublishedProducts } from "../controllers/clientController.js";

const router = express.Router();

router.get("/get-all-published-products", GetAllPublishedProducts);

export default router;