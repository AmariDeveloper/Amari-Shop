import axios from "axios";
import dotenv from "dotenv";
import convert from "xml-js";

//initialize .env file
dotenv.config();

export const createDPOToken = async(grandTotal, firstname, lastname, email, customer_phone) => {
    const xmlCreateToken = `
    <?xml version="1.0" encoding="utf-8"?>
            <API3G>
                  <CompanyToken>${process.env.DPO_COMPANY_TOKEN}</CompanyToken>
                  <Request>createToken</Request>
                  <Transaction>
                        <PaymentAmount>${grandTotal}</PaymentAmount>
                        <PaymentCurrency>KES</PaymentCurrency>
                        <CompanyRef>49FKEOA</CompanyRef>
                        <RedirectURL>https://amari.africa/checkout/order-complete-confirmation</RedirectURL>
                        <BackURL>https://amari.africa/checkout/billing-confirmation</BackURL>
                        <CompanyRefUnique>0</CompanyRefUnique>
                        <PTL>5</PTL>
                        <customerFirstName>${firstname}</customerFirstName>
                        <customerLastName>${lastname}</customerLastName>
                        <customerZip>254</customerZip>
                        <customerCity>Nairobi</customerCity>
                        <customerCountry>KE</customerCountry>
                        <customerPhone>${customer_phone}</customerPhone>
                        <customerEmail>${email}</customerEmail>
                        <DefaultPayment>CC</DefaultPayment>
                 </Transaction>
                 <Services>
                       <Service>
                             <ServiceType>${process.env.DPO_SERVICE_TYPE}</ServiceType>
                             <ServiceDescription>Product Purchase from Amari Shop</ServiceDescription>
                             <ServiceDate>2025/12/8 20:00</ServiceDate>
                       </Service>
                 </Services>
        </API3G>
    `;
    const config = {
        headers: { "Content-Type": "text/xml"}
    }

    try {
        const result = await axios.post(process.env.DPO_ENDPOINT_URL, xmlCreateToken, config);
          if(result){
                   const xmlResult = convert.xml2js(result.data, { compact: true})

                   let status = xmlResult.API3G.Result._text;
                   let token = xmlResult.API3G.TransToken._text;

                   return { token: token, status: status }
          }
      } catch (error) {
           console.log(error)
    }
}

export const verifyDPOTransaction = async(transaction_token) => {
       const xmlVerifyToken = `
              <?xml version="1.0" encoding="utf-8"?>
             <API3G>
                     <CompanyToken>${process.env.DPO_COMPANY_TOKEN}</CompanyToken>
                     <Request>verifyToken</Request>
                     <TransactionToken>${transaction_token}</TransactionToken>
            </API3G>
       `;

       const config = {
            headers: { "Content-Type": "text/xml"}
        }

       try {
             const result = await axios.post(process.env.DPO_ENDPOINT_URL, xmlVerifyToken, config);
             if(result){
                    const xmlResult = convert.xml2js(result.data, { compact: true })

                    return xmlResult;
             }
       } catch (error) {
             console.log(error)
       }
}