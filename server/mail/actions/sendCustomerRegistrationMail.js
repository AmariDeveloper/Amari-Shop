import dotenv from "dotenv";
import { mailTransport } from "../../config/mailconfig.js";
import ejs from "ejs";
import fs from "fs";

dotenv.config();

export const sendCustomerRegistrationMail = async(userData) => {
        const { email, name } = userData;

        const templateString = fs.readFileSync("./mail/views/customerRegistrationMail.ejs", "utf-8");

        const dynamicData = {
               name: name
        }

        const html = ejs.render(templateString, dynamicData);

        const mailOptions = {
                from: `Amari <${process.env.EMAIL}>`,
                to: `${email}`,
                name: "Amari",
                subject: "Welcome to Amari Africa - Your Access to the Best of African Products!",
                html: html
        }

        //send mail
        mailTransport.sendMail(mailOptions).then(() => {
               return true;
        })
}