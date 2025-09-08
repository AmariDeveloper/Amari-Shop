import express from "express";
import { GetAllPublishedProducts } from "../controllers/clientController.js";
import { LoginCustomerManually, LogoutCustomer, RegisterCustomerManually } from "../controllers/customerController.js";
import { upload } from "../utils/multer.js";
import { RegisterBusiness } from "../controllers/businessController.js";
import { InitiatePayment, VerifyPayment } from "../controllers/paymentsController.js";
import {  CreateAnOrder } from "../controllers/ordersController.js";

const router = express.Router();

//general
router.get("/get-all-published-products", GetAllPublishedProducts);


//customer
router.post("/register-customer-manually", RegisterCustomerManually);
router.post("/register-new-business", upload.single("business_cert"), RegisterBusiness);
router.post("/customer-login", LoginCustomerManually);
router.post("/customer-logout", LogoutCustomer);
router.post("/orders", CreateAnOrder);
router.post("/orders/payment", InitiatePayment);
router.post("/orders/confirmation", VerifyPayment);
export default router;