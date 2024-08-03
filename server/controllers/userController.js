import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js";


//Register User
export const RegisterUser = asyncHandler(async(req, res) => {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });

      if(userExists){
           res.status(503);;
           throw new Error("User account already exists.")
      }

      try {
            const profileImage = 'https://res.cloudinary.com/dfwrvpy2t/image/upload/v1710081790/dummylogo_nwaba0.jpg';

            const result = await User.create({ name, email, password, profileImage});

            if(result){
                 res.status(201).json({
                       message: "Account registered successfully",
                       name: result.name,
                       email: result.email,
                       id: result._id,
                       username: result.username
                 })
            }

      } catch (error) {
              throw new Error(`An error occured: ${error}`)
      }
})


//login user
export const LoginUser = asyncHandler(async(req, res) => {
         const { email, password } = req.body;

         const user = await User.findOne({ email });

         if(!user){
               throw new Error("Invalid account details.")
         }

         if(user && (await user.matchPasswords(password))){
                  generateToken(res, user._id);

                  res.status(201).json({
                       message: "Login Successful",
                       id: user._id,
                       email: user.email,
                       name: user.name,
                       profileImage: user.profileImage,
                       username: user.username
                  })
         }else{
               res.status(401);
               throw new Error("Invalid email or password.")
         }
})

//get logged in user profile details
export const GetUserProfile = asyncHandler(async(req, res) => {
          const user = await User.findById(req.user._id).select("-password");

          if(user){
                res.status(200).json({ user })
          }else{
                res.status(400).json({ message: "User profile couldn't be fetched at this time."})
          }
})