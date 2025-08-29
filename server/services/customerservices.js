import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";

export const createCustomer = async(firstname, lastname, email,street, city, country ) => {
       const userExists = await Customer.findOne({ email });

       if(userExists){
             return "AcctAlreadyExists"
       }else{
             const profileImage = "https://files.pazalab.com/amari/images/avatar.jpg";
             const name = `${firstname} ${lastname}`;

             const newCustomer = await Customer.create({ 
                  name, 
                  email, 
                  profileImage,
                  address: {
                         street: street,
                         city: city,
                         country: country
                  }
            });

             if(!newCustomer){
                   return { message: "Customer account not created."}
             }

             return newCustomer;
       }
}

export const getCustomerDetails = async(email) => {
       const customer = await Customer.findOne({ email });
       return customer;
}

export const createOrder = async(order) => {
      const {
            orderId,
            customerId,
            orderDate,
            orderStatus,
            products,
            grandTotal,
            phone,
            shippingAddress,
            payment
      } = order;

      const orderExists = await Order.findOne({ orderId });

      if(orderExists){
            return orderExists;
      }

      const newOrder = await Order.create({
            customerId,
            orderId,
            orderDate,
            orderStatus,
            products,
            grandTotal,
            phone,
            shippingAddress,
            payment
      })

      if(!newOrder){
             return;
      }

      return newOrder;
}


export const confirmPurchase = async(result) => {
       const {
            orderId,
            explanation,
            method,
            currency,
            transactionId,
            amountPaid,
            settlementDate
       } = result;

      const updateOrder = await Order.findOneAndUpdate({ orderId: orderId }, {
            paymentInfo: {
                  method: method,
                  transactionId: transactionId,
                  isPaid: explanation === "Transaction Paid" ? true : false,
                  amountPaid: amountPaid,
                  currency: currency,
                  settlementDate: settlementDate
            }
      }, { new: true})

      if(!updateOrder){
             return;
      }
      return updateOrder;
}
