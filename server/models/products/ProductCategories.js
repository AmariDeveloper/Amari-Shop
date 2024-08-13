import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
       name: { type: String, required: true, unique: true },
       slug: { type: String },
       parent: { type: String },
       description: { type: String},
       thumbnail: { type: String},
       products: { type: Number, default: 0}
}, { timestamps: true})

const Category = mongoose.model("Category", categorySchema);

export default Category;