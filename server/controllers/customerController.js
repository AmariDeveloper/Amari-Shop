import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import cloudinary from "../utils/cloudinary.js";
import { sendCustomerRegistrationMail } from "../mail/actions/sendCustomerRegistrationMail.js";
import { generateTokenForCustomers } from "../utils/generateToken.js";
//Register Customer manually
export const RegisterCustomerManually = asyncHandler(async(req, res) => {
       const { firstname, lastname, email, password } = req.body;

       const userExists = await Customer.findOne({ email });

       if(userExists){
              res.status(500).json({ message: "Customer account already exists. Try login in."});
       }else{
             const profileImage = "https://files.pazalab.com/amari/images/avatar.jpg";

             const name = `${firstname} ${lastname}`;
 
             const result = await Customer.create({ name, email, password, profileImage })
             
             const userData = { name: firstname, email: email }
             if(result){
                     sendCustomerRegistrationMail(userData);
                     res.status(201).json({
                           message: "Customer registered successfully.",
                           info: {
                                  name: result.name,
                                  email: result.name,
                                  id: result._id,
                                  profileImage: result.profileImage
                          }
                   })
               }else{
                     res.status(500).json({ message: "Customer not created. Internal server error"})
              }
       }
})

export const LoginCustomerManually = asyncHandler(async(req, res) => {
         const { email, password } = req.body;

         const user = await Customer.findOne({ email });

         if(!user){
                res.status(500).json({ message: "You do not have an account with us yet. Please consider registering."})
         }

         if(user && (await user.matchPasswords(password))){
                generateTokenForCustomers(res, user._id);

                res.status(201).json({
                      message: "Login Successful",
                      info: {
                             id: user._id,
                             name: user.name,
                             email: user.email,
                             profileImage: user.profileImage
                      }
                })
         }else{
               res.status(401);
               throw new Error("Invalid email or password!. Please try again.")
         }
})

//logout Customer
export const LogoutCustomer = asyncHandler(async(req, res) => {
        res.cookie("jwt", "", {
              httpOnly: true,
              expires: new Date(0)
        })
        res.status(200).json({ message: "You have logged out. Thank you for visiting Amari Africa."})
})