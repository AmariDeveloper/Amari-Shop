import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Category from "../models/products/ProductCategories.js";
import Variation from "../models/products/ProductVariations.js";
import Product from "../models/products/Products.js";
import { generateRandomCharacters } from "../utils/generateRandomChar.js";
//Create a new product
export const CreateNewProduct = asyncHandler(async(req, res) => {
         const productMainImage = req.files.pop();
         const otherProductImages = req.files;

         const { general, categories, variations, tags } = JSON.parse(req.body.data);
         const {
              product_title,
              product_short_description,
              product_sku,
              product_stock_status,
              product_stock_quantity,
              product_sold_individually,
              product_price,
              product_selling_price,
              product_additional_info,
              published_status,
              brand
         } = general;

         const productExists = await Product.findOne({ product_title });

         if(productExists){
                res.status(503).json({ message: "Product already exists!"})
         }else{
               /*upload images to cloudinary */
              const other_image_urls = []
              const cloudinary_main_image = await cloudinary.uploader.upload(productMainImage.path, { folder: "Product Main Images"});

              for(let file of otherProductImages){
                     const cloudinary_other_image = await cloudinary.uploader.upload(file.path, { folder: "Product Images"} );
                     if(cloudinary_other_image){
                           other_image_urls.push(cloudinary_other_image.secure_url) 
                     }
              }

              //create new product 
              const newProduct = await Product.create({
                       product_title: product_title,
                       product_slug:  product_title.replaceAll(" ", "-"),
                       product_short_description: product_short_description,
                       product_inventory: {
                             product_sku_code: product_sku == "" ? generateRandomCharacters() : product_sku.toUpperCase(),
                             product_stock_status: product_stock_status,
                             product_stock_quantity: product_stock_quantity,
                             is_product_sold_individually: product_sold_individually
                       },
                       product_imagery: {
                             product_main_image: cloudinary_main_image.secure_url,
                             product_gallery: other_image_urls
                       },
                       product_pricing: {
                            product_regular_price: product_price,
                            product_selling_price: product_selling_price,
                       },
                       product_additional_info: product_additional_info,
                       product_publish_status: published_status,
                       product_brand: brand,
                       product_categories: categories,
                       product_variations: {
                              product_variation_name: variations.variationName,
                              product_selected_variations: variations.selected
                       },
                      product_tags: tags
              })
           
              if(newProduct){
                     res.status(201).json({ message: "New product created successfully."})
              }else{
                     res.status(500).json({ message: "Internal error while creating product!"})
              }
         }
})


//edit product
export const EditProduct = asyncHandler(async(req, res) => {
        const productMainImage = req.files["mainImage"] && req.files['mainImage'][0];
        const otherProductImages = req.files["galleryImages"] && req.files["galleryImages"];
        
        const { general, categories, variations, tags } = JSON.parse(req.body.data);

        const newImagesArray = JSON.parse(req.body.NewImagesArray);
        const sanitizedImages = newImagesArray.map(item => item.path);
        
        const {
              product_title,
              product_short_description,
              product_sku,
              product_stock_status,
              product_stock_quantity,
              product_sold_individually,
              product_price,
              product_selling_price,
              product_additional_info,
              published_status,
              brand
         } = general;

         const currentProduct = await Product.findOne({ product_title })
       
         /* Upload images to cloudinary if uploaded */
         let main_image, other_image_urls = [];
        if(productMainImage){
               const cloudinary_main_image = await cloudinary.uploader.upload(productMainImage.path, { folder: "Product Main Images"});
               if(cloudinary_main_image) main_image = cloudinary_main_image.secure_url;
        }else{
              main_image = currentProduct.product_imagery.product_main_image;
        }
        
        if(otherProductImages && otherProductImages.length > 0){
              other_image_urls.push(...sanitizedImages);
              for(let file of otherProductImages){
                     const cloudinary_other_image = await cloudinary.uploader.upload(file.path, { folder: "Product Images"});
                     if(cloudinary_other_image){
                            other_image_urls.push(cloudinary_other_image.secure_url);
                     }
              }
        }else{
              other_image_urls.push(...sanitizedImages)
        }

      
       //initiate editing
       const editedProduct = await Product.findOneAndUpdate({ product_title: product_title}, {
              product_title: product_title,
              product_slug: product_title.replaceAll(" ", "-"),
              product_short_description: product_short_description,
              product_inventory: {
                     product_sku_code: product_sku == "" ? generateRandomCharacters() : product_sku.toUpperCase(),
                     product_stock_status: product_stock_status,
                     product_stock_quantity: product_stock_quantity,
                     is_product_sold_individually: product_sold_individually
               },
               product_imagery: {
                     product_main_image: main_image,
                     product_gallery: other_image_urls
               },
               product_pricing: {
                    product_regular_price: product_price,
                    product_selling_price: product_selling_price,
               },
               product_additional_info: product_additional_info,
               product_publish_status: published_status,
               product_brand: brand,
               product_categories: categories,
               product_variations: {
                      product_variation_name: variations.variationName,
                      product_selected_variations: variations.selected
               },
              product_tags: tags
       }, { new: true})

       if(editedProduct){
              res.status(201).json({ message: "Product edit successfully."})
       }else{
              res.status(500).json({ message: "Internal server error while editing product!"})
       }
})
//Delete Product
export const DeleteProduct = asyncHandler(async(req, res) => {
         const { id } = req.body;

         const deletedProduct = await Product.findByIdAndDelete(id);

         if(deletedProduct){
               res.status(201).json({ message: "Product deleted successfully."})
         }else{
              res.status(500).json({ message: "Internal server error occured while deleting the product"})
         }
})


//Get all products
export const GetAllProducts = asyncHandler(async(req, res) => {
        const products = await Product.find({});

        if(products){
              res.status(200).json({ products })
        }else{
              res.status(500).json({ message: "Error occured while fetching products"})
        }
})


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

//Create a Variation
export const CreateVariation = asyncHandler(async(req, res) => {
          const { name, description, components } = req.body;

          const tweakedName = name.toLowerCase();

          const variationExists = await Variation.findOne({ name: tweakedName});

          if(variationExists){
                 res.status(503).json({ message: "Variation already exists"})
          }else{
                const newVariation = await Variation.create({
                      name: tweakedName,
                      description: description,
                      components: components
                })

                if(newVariation){
                      res.status(201).json({ message: "New variation created."})
                }else{
                     res.status(500).json({ message: "Error while creating variation."})
                }
          }
})

//Get all created variations
export const GetAllVariations = asyncHandler(async(req, res) => {
       const variations = await Variation.find({});

       if(variations){
              res.status(200).json({ variations })
       }else{
              res.status(500).json({ message: "No variations fetched at this moment."})
       }
})

//Edit a variation
export const EditVariation = asyncHandler(async(req, res) => {
         const { name, description, components } = req.body;

         const cased_name = name.toLowerCase();

         const updateVariation = await Variation.findOneAndUpdate({ name: cased_name}, {
                  name: cased_name,
                  description: description,
                  components: components
         }, { new: true})

         if(updateVariation){
              res.status(200).json({ message: "Variation update successful"})
         }else{
               res.status(500).json({ message: "Variation update failed"})
         }
       
})
//Delete a variation
export const DeleteVariation = asyncHandler(async(req, res) => {
       const { id } = req.body;

       try {
              const deleted = await Variation.findByIdAndDelete(id);
              if(deleted){
                      res.status(201).json({ message: "Variation deleted Successfully."})
              }else{
                     res.status(503).json({ message: "Variation deletion failed."})
              }
       } catch (error) {
              console.log(error)
       }
})