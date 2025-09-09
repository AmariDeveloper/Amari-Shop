import asyncHandler from "express-async-handler";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import Product from "../models/products/Products.js";

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

//Check order products quantities
export const checkOrderProductQuantity = async(products) => {
       try {
             const order_items = [];

             for(let { id, total_quantity } of products){
                  const product = await Product.findOneAndUpdate({ _id: id, "product_inventory.product_stock_quantity": { $gte: total_quantity}},
                        { $inc: { "product_inventory.product_stock_quantity": -total_quantity, reserved: total_quantity }},
                        { new: true }
                  )
                  //If we have a problem with the stock for each of the order product items
                  if(!product){
                        const insufficient = await Product.findById({ _id: id});
                        throw new Error(`Not enough stock for the product: ${insufficient.product_title} `);
                  }
                  order_items.push(
                     { 
                         id, 
                        quantity: total_quantity, 
                        price: product.product_pricing.product_regular_price, 
                        title: product.product_title
                     })
            }

            return order_items;
       } catch (error) {
            console.log(`${error}`)
       }
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

      const sanitizedOrderProducts = await checkOrderProductQuantity(products);

      if(!sanitizedOrderProducts){
            return;
      }

      const newOrder = await Order.create({
            customerId,
            orderId,
            orderDate,
            orderStatus,
            products : sanitizedOrderProducts,
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


//Update product stock quantity and reservations based on whether payment is successful or not
export const harmonizeProductQuantity = async(orderId, explanation) => {
        const orderItem = await Order.findOne({ orderId: orderId });
       
        for(let item of orderItem.products){
              await Product.findByIdAndUpdate(item.id, {
                    $inc: explanation === "Transaction Paid" ? { "reserved": -item.quantity} :
                              { "product_inventory.product_stock_quantity": item.quantity, "reserved": -item.quantity}
              })
        }
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

     //update reservations and product quantity
      await harmonizeProductQuantity(orderId, explanation);

      const updateOrder = await Order.findOneAndUpdate({ orderId: orderId }, {
            orderStatus: "Ready for Processing",
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
