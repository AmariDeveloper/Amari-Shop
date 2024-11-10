import asyncHandler from "express-async-handler";
import Business from "../models/Business.js";
import cloudinary from "../utils/cloudinary.js";
import { sendSupplierRegistrationMail } from "../mail/actions/sendSupplierRegistrationMail.js";

//Register New Supplier Business
export const RegisterBusiness  = asyncHandler(async(req, res) => {
          const { 
            business_name, 
            fullname, 
            email, 
            phone, 
            product_description,
            country,
            address, 
            product_types, 
            //service_plan, 
            source, 
            website,
            x,
            other_category, 
            linkedin,
            facebook,
            instagram
         } = JSON.parse(req.body.data);

         const userExists = await Business.findOne({ email });

         const firstname = fullname.split(" ")[0]
         const userEmailData = { name: firstname, email: email}

         if(userExists){
                    res.status(500).json({ message: "This business seems to be already registered. Contact our support center."});
         }else{
                if(!req.file){
                     res.status(500).json({ message: "Please upload your business registration certificate"});
                }else{
                       const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: "Business Files"});

                      if(cloudinary_result){
                              const new_business = await Business.create({
                                  business_name: business_name,
                                  person_name: fullname,
                                  email: email,
                                  phone: phone,
                                  country: country,
                                  address: address,
                                  product_category_types: product_types,
                                  other_category_types: other_category,
                                  product_description: product_description,
                                  business_cert: cloudinary_result.url,
                                  subscription_plan: 'Professional',
                                  source: source,
                                  website_link: website,
                                  facebook_link: facebook,
                                  instagram_link: instagram,
                                  linkedin_link: linkedin,
                                  x_link: x,
                           })

                           if(new_business){
                                  sendSupplierRegistrationMail(userEmailData);
                                  res.status(201).json({ message: "Registration Submitted Successfully!"})
                           }else{
                               res.status(500).json({ message: "Internal Server Error. We have taken a note and are fixing it. Please check back later."})
                           }
                    }
                }
         }
})