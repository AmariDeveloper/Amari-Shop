import express from "express";
import { GetAllPublishedProducts } from "../controllers/clientController.js";
import { LoginCustomerManually, LogoutCustomer, RegisterCustomerManually } from "../controllers/customerController.js";
import { upload } from "../utils/multer.js";
import { RegisterBusiness } from "../controllers/businessController.js";
import { InitiatePayment, verifyPayment } from "../controllers/paymentsController.js";
import { ConfirmPurchase, CreateAnOrder } from "../controllers/ordersController.js";

const router = express.Router();

//general
router.get("/get-all-published-products", GetAllPublishedProducts);


//customer
router.post("/register-customer-manually", RegisterCustomerManually);
router.post("/register-new-business", upload.single("business_cert"), RegisterBusiness);
router.post("/customer-login", LoginCustomerManually);
router.post("/customer-logout", LogoutCustomer);
//router.post("/process-payment", InitiatePayment);
router.post("/verify-transaction", verifyPayment);
router.post("/orders", CreateAnOrder);
router.post("/orders/payment", InitiatePayment);
router.post("/orders/confirmation", ConfirmPurchase);
export default router;