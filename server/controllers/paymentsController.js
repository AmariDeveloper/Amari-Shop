import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
const  xmlData = `<?xml version=\"1.0\" encoding=\"utf-8\"?>
        <API3G>
              <CompanyToken>57466282-EBD7-4ED5-B699-8659330A6996</CompanyToken>
              <Request>createToken</Request>
              <Transaction>
                    <PaymentAmount>450.00</PaymentAmount>
                    <PaymentCurrency>USD</PaymentCurrency>
                    <CompanyRef>49FKEOA</CompanyRef>
                    <RedirectURL>http://www.domain.com/payurl.php</RedirectURL>
                    <BackURL>http://www.domain.com/backurl.php </BackURL>
                    <CompanyRefUnique>0</CompanyRefUnique>
                    <PTL>5</PTL>
             </Transaction>
             <Services>
                   <Service>
                         <ServiceType>45</ServiceType>
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
       const customerExists = await Customer.findOne({ email })

       console.log(req.body)

       if(customerExists){
               
       }else{
             const name = `${firstname} ${lastname}`;
             //const result = await Customer.create({ name, email, profileImage });
       }

      res.status(201).json({ message: "This thing is working thanks."})
})