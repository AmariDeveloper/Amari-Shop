import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
      customerId: {
            type: Schema.Types.ObjectId, 
            ref: "Customer"
      },
      orderId: { type: String, required: true, unique: true },
      orderDate: String,
      orderStatus: String,
      products: [
           { 
              title: String, 
              id: { type: Schema.Types.ObjectId , ref: "Product"},
              price: Number, 
              quantity: Number, 
           }
      ],
      grandTotal: Number,
      phone: String,
      shippingAddress: {
             street: String,
             town: String,
             city: String,
             country: String
      },
      paymentInfo: {
            method: String,
            transactionId: String,
            isPaid: { type: Boolean, default: false},
            amountPaid: Number,
            currency: String,
            settlementDate: String
      },
}, {  timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;