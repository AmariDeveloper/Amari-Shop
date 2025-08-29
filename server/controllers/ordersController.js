import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { createCustomer, createOrder, getCustomerDetails } from "../services/customerservices.js";
import { format } from 'date-fns';

export const CreateAnOrder = asyncHandler(async(req, res) => {
       const {
            basket,
            firstname,
            lastname,
            email,
            orderId,
            phone,
            city,
            street,
            country,
            grandTotal,
       } = req.body;

       const sanitizedBasket = basket.map(item => {
             return {
                    title: item.title,
                    id: new mongoose.Types.ObjectId(`${item.id}`),
                    price: item.price,
                    total_quantity: item.total_quantity,
             }
       })
       
       try {
              const customer = await createCustomer(firstname, lastname, email, street, city, country);
              
              //If customer already exists
              if(customer === "AcctAlreadyExists"){
                     const existing_customer = await getCustomerDetails(email);

                     const order_payload = {
                            customerId: existing_customer._id,
                            orderId: orderId,
                            orderDate: new Date(),
                            orderStatus: "Pending Payment",
                            products: sanitizedBasket,
                            phone: phone,
                            grandTotal: grandTotal,
                            shippingAddress: { street: street, city: city, country: country }
                     }
                     const newOrder = await createOrder(order_payload);

                     if(newOrder){
                           res.status(201).json({ message: "Order created successfully!", payment_payload: {
                                 firstname: firstname,
                                 lastname: lastname,
                                 grandTotal: grandTotal,
                                 orderDate: format(newOrder.orderDate, 'yyyy/MM/dd HH:mm:ss'), 
                                 phone: phone,
                                 email: email
                           }})
                     }else{
                           res.status(500).json({ message: "Error while creating this order."})
                     }
              }else{
                    //new customer creating an order
                   const order_payload = {
                            customerId: customer._id,
                            orderId: orderId,
                            orderDate: new Date(),
                            orderStatus: "Pending Payment",
                            products: sanitizedBasket,
                            phone: phone,
                            grandTotal: grandTotal,
                            shippingAddress: { street: street, city: city, country: country }
                     }
                     const newOrder = await createOrder(order_payload);
                    
                    if(newOrder){
                         res.status(201).json({ message: "Order created successfully!", payment_payload: {
                                firstname: firstname,
                                lastname: lastname,
                                orderDate: format(newOrder.orderDate, 'yyyy/MM/dd HH:mm:ss'),
                                grandTotal: grandTotal,
                                phone: phone,
                                email: email
                         }})
                     }else{
                           res.status(500).json({ message: "Error while creating this order."})
                     }
              }
       } catch (error) {
              console.log(error);
              res.status(500).json({ message: "Internal server error"})
       }
})


export const ConfirmPurchase = asyncHandler(async(req, res) => {
       
})