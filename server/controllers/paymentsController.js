import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import dotenv from "dotenv";
import { createDPOToken, verifyDPOTransaction } from "../config/dpoConfig.js";

//initialize .env file
dotenv.config();

export const InitiatePayment = asyncHandler(async(req, res) => {
      const {
            firstname,
            lastname,
            email,
            phone,
            grandTotal,
            orderDate,
       } = req.body;

      try {
            const { token, status } = await createDPOToken(grandTotal, firstname, lastname, email, phone, orderDate);

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
       const { token, orderId} = req.body.payload;

       console.log(orderId)

       try {
             const result = await verifyDPOTransaction(token);
             const status = result.API3G.Result._text;
             const payload = {
                     orderId: orderId,
                     explanation: result.API3G.ResultExplanation._text,
                     method: result.API3G.CustomerCreditType._text,
                     transactionId: result.API3G.TransactionApproval._text,
                     currency: result.API3G.TransactionFinalCurrency._text,
                     amountPaid: result.API3G.TransactionFinalAmount._text,
                     settlementDate:result.API3G.TransactionSettlementDate._text
             }
             console.log(payload)
             if(status === "000"){
                     res.status(201).json({ message: "Payment complete"})
             } else{
                  res.status(501).json({ message: "Transaction verification failed."})
             }
       } catch (error) {
              //console.log(error);
              res.status(500).json({ message: "Error. Payment not verified. Please contact Amari support for help and clarification!"})
       }
})