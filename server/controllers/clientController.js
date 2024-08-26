import asyncHandler from "express-async-handler";
import Product from "../models/products/Products.js";


//Get all published products
export const GetAllPublishedProducts = asyncHandler(async(req, res) => {
      const products = await Product.find({ product_publish_status: "Published"});

      if(products){
            res.status(200).json({ products });
      }else{
           res.status(500).json({ message: "Error occured while fetching products!"})
      }
})