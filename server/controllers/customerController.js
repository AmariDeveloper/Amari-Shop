import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

//Register Customer manually
export const RegisterCustomerManually = asyncHandler(async(req, res) => {
       const { firstname, lastname, email, password } = req.body;

       const userExists = await Customer.findOne({ email });

       if(userExists){
              res.status(500).json({ message: "Customer account already exists. Try login in."});
       }else{
             const profileImage = "https://res.cloudinary.com/dyru8nefb/image/upload/v1728383986/dummy-profile_mns0ls.jpg";

             const name = `${firstname} ${lastname}`;
 
             const result = await Customer.create({ name, email, password, profileImage })
 
             if(result){
                     res.status(201).json({
                           message: "Customer registered successfully.",
                           info: {
                                  name: result.name,
                                  email: result.name,
                                  id: result._id
                          }
                   })
               }else{
                     res.status(500).json({ message: "Customer not created. Internal server error"})
              }
       }
})