import express from "express"
import { 
    GetUserProfile, 
    LoginUser, 
    LogoutUser, 
    RegisterUser, 
    UpdateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js"

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser)
router.get("/user-profile", protect, GetUserProfile)
router.put("/update-user-profile", protect, upload.single("profileImage"), UpdateUserProfile);
router.post("/logout", LogoutUser);
export default router;