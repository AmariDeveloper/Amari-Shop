import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
      customerId: {
            type: Schema.Types.ObjectId, 
            ref: "Customer"
      },
      orderDate: String,
      orderStatus: String,
      products: [
           { title: String, 
              id: { type: Schema.Types.ObjectId , ref: "Product"},
              price: Number, 
              quantity: Number, 
           }
      ],
      grandTotal: Number,
      phone: String,
      shippingAddress: {
             street: String,
             subcounty: String,
             city: String,
             country: String
      },
      paymentInfo: {
            method: String,
            transactionId: String,
            isPaid: { type: Boolean, default: false},
            amountPaid: Number,
      },
      notes: String
}, {  timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;