import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"

export const generateTokenForCustomers = (res, userId) => {
       const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d"});
       const mimic = uuidv4();

       res.cookie("jwt", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: "strict",
              maxAge: 720 * 60 * 60 * 1000
       })

       //automatic logout
       res.cookie("user_mimic", mimic, {
              httpOnly: false,
              maxAge: 720 * 60 * 60 * 1000
       })
}

export const generateTokenForManagers = (res, userId) => {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d"});
        const mimic_token = uuidv4();

        res.cookie("jwt_mgmt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
        })

        //automatic logout
        res.cookie("mimicTkn", mimic_token, {
              httpOnly: false,
              maxAge: 24 * 60 * 60 * 1000,
        })
}
