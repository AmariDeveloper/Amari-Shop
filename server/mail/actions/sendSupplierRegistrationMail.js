import dotenv from "dotenv";
import { mailTransport } from "../../config/mailconfig.js";
import ejs from "ejs";
import fs from "fs";

dotenv.config();

export const sendSupplierRegistrationMail = async(userData) => {
        const { email, name } = userData;
        const templateString = fs.readFileSync("./mail/views/supplierRegistrationMail.ejs", "utf-8");

        const dynamicData = {
              name: name
        }

        const html = ejs.render(templateString, dynamicData);

        const mailOptions = {
               from: `Amari <${process.env.EMAIL}>`,
               to: `${email}`,
               name: "Amari",
               subject: "Welcome Aboard!",
               html: html
        }

        //Send the mail
        mailTransport.sendMail(mailOptions).then(() => {
               return true;
        })
}