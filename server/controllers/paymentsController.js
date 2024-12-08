import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import dotenv from "dotenv";
import { createDPOToken, verifyDPOTransaction } from "../config/dpoConfig.js";

//initialize .env file
dotenv.config();

export const InitiatePaymentWithCard = asyncHandler(async(req, res) => {
      const {
            basket,
            firstname,
            lastname,
            email,
            phone,
            subcounty,
            street,
            country,
            city,
            shipping,
            grandTotal,
       } = req.body;

      try {
            const customer_phone = phone.slice(3)
      
            const { token, status } = await createDPOToken(grandTotal, firstname, lastname, email, customer_phone);

            if(status === "000"){
                   res.status(201).json({ message: token })
            }else{
                   res.status(500).json({ message: "Error! Payment failed."})
            }
           
      } catch (error) {
            //console.log(error)
            res.status(500).json({ message: "Error. Transaction unsuccessful!"})
      }
})

export const verifyPayment = asyncHandler(async(req, res) => {
       const { transaction_id, transaction_token} = req.body;

       try {
             const result = await verifyDPOTransaction(transaction_token);
             const status = result.API3G.Result._text;
             console.log(status);
             if(status === "000"){
                     res.status(201).json({ message: "Payment complete"})
             } else{
                  res.status(501).json({ message: "Transaction verification failed."})
             }
       } catch (error) {
              console.log(error);
              res.status(500).json({ message: "Error. Payment not verified. Please contact Amari support for help and clarification!"})
       }
})