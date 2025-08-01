import express from "express";
import { GetAllPublishedProducts } from "../controllers/clientController.js";
import { LoginCustomerManually, LogoutCustomer, RegisterCustomerManually } from "../controllers/customerController.js";
import { upload } from "../utils/multer.js";
import { RegisterBusiness } from "../controllers/businessController.js";
import { InitiatePaymentWithCard, verifyPayment } from "../controllers/paymentsController.js";

const router = express.Router();

//general
router.get("/get-all-published-products", GetAllPublishedProducts);


//customer
router.post("/register-customer-manually", RegisterCustomerManually);
router.post("/register-new-business", upload.single("business_cert"), RegisterBusiness);
router.post("/customer-login", LoginCustomerManually);
router.post("/customer-logout", LogoutCustomer);
router.post("/process-payment", InitiatePaymentWithCard);
router.post("/verify-transaction", verifyPayment);

export default router;