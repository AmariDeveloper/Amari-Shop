import express from "express"
import { 
    GetUserProfile, 
    LoginUser, 
    RegisterUser 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser)
router.get("/user-profile", protect, GetUserProfile)

export default router;