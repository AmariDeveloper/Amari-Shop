import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
      customer: {
            type: Schema.Types.ObjectId, 
            ref: "Customer"
      },
      products: [
           { title: String, id: String, price: Number, quantity: Number, image: String}
      ],
      grandTotal: Number,
      phone: String,
      address: {
             street: String,
             subcounty: String,
             city: String,
             country: String
      },
      shipping: Number,
})