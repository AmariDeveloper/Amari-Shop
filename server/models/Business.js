import mongoose from "mongoose";

const businessSchema = mongoose.Schema({
      business_name: {
            type: String,
            required: true
      },
      person_name: {
           type: String,
           required: true
      },
      email: { type: String, required: true},
      phone: { type: String, required: true},
      country: { type: String, required: true },
      address: { type: String, required: true },
      product_category_types: [{ type: String}],
      other_category_types: { type: String},
      product_description: { type: String, required: true},
      business_cert: { type: String, required: true },
      subscription_plan: { type: String, required: true },
      source: { type: String, required: true },
      website_link: { type: String },
      facebook_link: { type: String },
      x_link: { type: String },
      instagram_link: { type: String },
      linkedin_link: { type: String }
})

const Business = mongoose.model("Business", businessSchema);

export default Business;