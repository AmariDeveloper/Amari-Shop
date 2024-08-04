import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
       name: { type: String },
       slug: { type: String },
       parent: { type: String },
       description: { type: String},
       thumbnail: { type: String},
       products: { type: Number}
}, { timestamps: true})

const Category = mongoose.model("Category", categorySchema);

export default Category;