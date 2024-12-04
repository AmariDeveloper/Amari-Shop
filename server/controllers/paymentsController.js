import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import dotenv from "dotenv";
import axios from "axios";

//initialize .env file
dotenv.config();

const  xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <API3G>
              <CompanyToken>B3F59BE7-0756-420E-BB88-1D98E7A6B040</CompanyToken>
              <Request>createToken</Request>
              <Transaction>
                    <PaymentAmount>450.00</PaymentAmount>
                    <PaymentCurrency>KES</PaymentCurrency>
                    <CompanyRef>49FKEOA</CompanyRef>
                    <RedirectURL>http://localhost:5173/checkout/billing-confirmation</RedirectURL>
                    <BackURL>http://localhost:5173/checkout/billing-confirmation </BackURL>
                    <CompanyRefUnique>0</CompanyRefUnique>
                    <PTL>5</PTL>
             </Transaction>
             <Services>
                   <Service>
                         <ServiceType>85325</ServiceType>
                         <ServiceDescription>Flight from Nairobi to Diani</ServiceDescription>
                         <ServiceDate>2013/12/20 19:00</ServiceDate>
                   </Service>
             </Services>
          </API3G>`;

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
            card
       } = req.body;

       //attempt to get customer if exists
      //  const customerExists = await Customer.findOne({ email })

      //  if(customerExists){
               
      //  }else{
      //        const name = `${firstname} ${lastname}`;
      //        //const result = await Customer.create({ name, email, profileImage });
      //  }

      const config = {
             headers: { "Content-Type": "text/xml"}
      }

     axios.post(process.env.DPO_ENDPOINT_URL, xmlData, config).then(res => {
            console.log(res.data)
     })

      res.status(201).json({ message: "This thing is working thanks."})
})