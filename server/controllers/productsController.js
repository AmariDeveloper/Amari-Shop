import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Category from "../models/products/ProductCategories.js";

export const AddNewCategory = asyncHandler(async(req, res) => {
       const { name, slug, parent, description } = JSON.parse(req.body.data);
       
       const categoryExists = await Category.findOne({ name: name });
       if(categoryExists){
               res.status(503).json({ message: "Category already exists!"})
       }else{
              let thumbnail;

              if(!req.file){
                     thumbnail = "https://res.cloudinary.com/dyru8nefb/image/upload/v1723111815/Thumbnails/zcwtuefwjopft3z4fgwk.jpg";
              }else{
                     //upload thumbnail to cloudinary
                      const cloudinary_result = await cloudinary.uploader.upload(req.file.path, { folder: "Thumbnails"});
                      thumbnail = cloudinary_result.secure_url;
              }

              const newCategory = await Category.create({ name, slug, parent, description, thumbnail })

              if(newCategory){
                     res.status(201).json({ message: "New category created"})
              }else{
                      res.status(500).json({ message: "Internal server error."})
              }
       }

})

export const GetAllCategories = asyncHandler(async(req, res) => {
       const categories = await Category.find({})

       if(categories){
              res.status(200).json({ categories })
       }else{
              res.status(500).json({ message: "No categories fetched at this moment."})
       }
})

export const DeleteCategory = asyncHandler(async(req, res) => {
        const { name } = req.body;

         try {
              const deleted = await Category.findOneAndDelete({name: name })
              console.log(deleted)
             if(deleted){
                    res.status(200).json({ message: "Category deleted Successfully."})
             }else{
                    res.status(500).json({ message: "Category deletion failed."})
             }
         } catch (error) {
               console.log(error)
         }
})

//Edit category
export const EditCategory = asyncHandler(async(req, res) => {
       const { name, slug, parent, description } = JSON.parse(req.body.data);
       const id = JSON.parse(req.body.id);
       
       const category = await Category.findById(id);
       
       if(category){
              let thumbnail;

              if(!req.file){
                     thumbnail = category.thumbnail;
              }else{
                   const cloudinary_result = await cloudinary.uploader.upload(req.file.path,  { folders: "Thumbnails" });
                   thumbnail = cloudinary_result.secure_url;
              }

              const updatedCategory = await Category.findByIdAndUpdate(category._id,{
                     name: name,
                     slug: slug,
                     parent: parent,
                     description: description,
                     thumbnail: thumbnail
              }, { new: true})
             
              if(updatedCategory){
                     res.status(201).json({ message: "Category update successful."})
              }else{
                     res.status(500).json({ message: "Category update failed."})
              }
       }
})