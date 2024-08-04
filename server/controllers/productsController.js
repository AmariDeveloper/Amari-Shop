import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Category from "../models/products/ProductCategories.js";

export const AddNewCategory = asyncHandler(async(req, res) => {
       console.log(req.body)
})