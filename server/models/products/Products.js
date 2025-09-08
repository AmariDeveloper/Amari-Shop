import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
         product_title: { type: String, required: true, unique: true },
         product_slug: { type: String, required: true, lowercase: true },
         product_short_description: { type: String },
         product_inventory: {
                product_sku_code: { type: String},
                product_stock_status: { type: String},
                product_stock_quantity: { type: Number},
                is_product_sold_individually: { type: Boolean},
               product_gallery: [ { type: String }]
         },
         product_pricing: {
                product_regular_price: { type: Number},
                product_selling_price: { type: Number }
         },
         product_additional_info: { type: String },
         product_publish_status: { type: String },
         product_categories: [{ id: String, name: String}],
         product_variations: {
                 product_variation_name: { type: String},
                 product_selected_variations: [ { id: String, name: String }]
         },
         product_brand: { type: String},
         product_tags: [{ name: String }],
         reviews: { type: String},
         reserved: { type: Number, default: 0 }
}, { timestamps: true })

const Product = mongoose.model("Product", productsSchema);

export default Product