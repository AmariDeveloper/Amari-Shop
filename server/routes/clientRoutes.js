import express from "express";
import { GetAllPublishedProducts } from "../controllers/clientController.js";
import { RegisterCustomerManually } from "../controllers/customerController.js";

const router = express.Router();

//general
router.get("/get-all-published-products", GetAllPublishedProducts);


//customer
router.post("/register-customer-manually", RegisterCustomerManually)

export default router;