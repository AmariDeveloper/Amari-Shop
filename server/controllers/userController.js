import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import cloudinary from "../utils/cloudinary.js"
import { generateTokenForManagers } from "../utils/generateToken.js";

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
                  generateTokenForManagers(res, user._id);

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

//update profile details
export const UpdateUserProfile = asyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
      
        if(user){
              let profileImage;
               //profile photo not uploaded
               if(!req.file){
                     profileImage = user.profileImage;
               }else{
                    const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: "ProfilePhotos"});

                    profileImage = cloudinary_result.secure_url;
               }

               //update user
               const { firstname, lastname, email, username, phone, country, bio } = JSON.parse(req.body.data);

               const updatedUser = await User.findByIdAndUpdate(user._id, {
                       name: `${firstname} ${lastname}`,
                       email: email,
                       username: username,
                       phone: phone,
                       country: country,
                       bio: bio,
                       profileImage: profileImage
               }, { new: true})
              
               if(updatedUser){
                       res.status(201).json({ message: "Settings saved successfully", info: updatedUser})
               }else{
                      res.status(500).json({ message: "Settings update failed"})
               }               
        }
})

//Logout User
export const LogoutUser = asyncHandler(async(req,res) => {
       res.cookie("jwt", "", {
               httpOnly: true,
               expires: new Date(0)
       })
       res.status(200).json({ message: "You have logged out "})
})