import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import complete from "../../../assets/purchased.png"
import billingImg from "../../../assets/receipt.png"
import { useVerifyTransactionMutation } from "../../../redux/slices/public/actionSlice";
import { clearShoppingCart } from "../../../redux/slices/public/cartSlice";
import { clearOrderId, clearOrderInformation } from "../../../redux/slices/public/billingSlice";

const OrderCompleteBody = () => {
    const { details, order, orderId } = useSelector(state => state.billing);
    const [ status, setStatus ] = useState(true);
    const [ responseData, setResponseData ] = useState();
    const urlParams = new URLSearchParams(window.location.search);

    const transaction_token = urlParams.get("TransactionToken");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ verifyPayment ] = useVerifyTransactionMutation();

   const payload = useMemo(() => {
          return { token : transaction_token }
   }, [transaction_token])

   useEffect(() => {
         try {
              verifyPayment({...payload, orderId}).then(res => {
                     console.log(res)
                      if(res.data.message === "Payment complete"){
                              setStatus(false);
                              setResponseData({...res.data.orderData})
                              dispatch(clearOrderId());
                              dispatch(clearShoppingCart());
                      }else{
                            navigate("/checkout/billing-confirmation")
                      }
              })
         } catch (error) {
              //console.log(error)
              navigate("/checkout/billing-confirmation")
         }
   }, [verifyPayment, payload, navigate, dispatch, orderId])


 
    const calculateTotal = () => {
           const count = order.basket.reduce((acc, curr) => acc+curr.price, 0)
           const grandT = count + order.shipping

           return { subtotal: count, grandtotal: grandT}
    }

    const continueShopping = () => {
           dispatch(clearOrderInformation());
           navigate("/shop")
    }
  return (
    <div className="order-completion-body">
             <div className={ status ? "order-verification active" : "order-verification"}>
                    <div className="billing-circle">
                              <div className="billing-loader-wrap"></div>
                              <img src={billingImg} alt="" />
                     </div>
                     <div className="billing-loader-texts">
                              <h3>Verifying Payment...Please wait.</h3>
                     </div>
             </div>
             <div className="inner-row-2">
                        <div className="completion-box">
                                    <div className="completion-icon">
                                               <img src={complete} alt="" />
                                    </div>
                                    <h3>Thank you for your Order!</h3>
                                    <p>The order confirmation has been sent to {details.email}</p>

                                    <div className="extra-details">
                                                <div className="extra-detail-row">
                                                           <h4>Transaction Date</h4>
                                                           <h5>{ responseData && responseData.settlementDate}</h5>
                                                </div>
                                                <div className="extra-detail-row">
                                                           <h4>Payment Method</h4>
                                                           <h5>{ responseData && responseData.method}</h5>
                                                </div>
                                                <div className="extra-detail-row">
                                                           <h4>Shipping Method</h4>
                                                           <h5>Express delivery (1-3 business days)</h5>
                                                </div>
                                    </div>
                                    <div className="order-details">
                                                <h4>Your Order</h4>
                                                <div className="order-details-row">
                                                            { order.basket.map(item => 
                                                                  <div className="order-detail-moja" key={item.id}>
                                                                            <div className="left-column">
                                                                                      <img src={item.main_image} alt="" />
                                                                                       <div className="order-deets">
                                                                                                 <h5>{item.title}</h5>
                                                                                                 <div className="order-deets-vars">
                                                                                                         { item.variations && item.variations.length > 0 && <figure>Variations:</figure>}
                                                                                                          { item.variations && item.variations.length > 0 ? 
                                                                                                                   <div className="vars-wrapper">
                                                                                                                         {item.variations.map(vr => 
                                                                                                                               <div className="vr-box" key={vr.id}>
                                                                                                                                        { vr.name.startsWith("#") ? 
                                                                                                                                               <div className="vr-inner">
                                                                                                                                                        <span style={{ background: `${vr.name}`}}></span>
                                                                                                                                                        <span>x{vr.quantity}</span>
                                                                                                                                               </div>
                                                                                                                                               :
                                                                                                                                               vr.name.startsWith("https") ?
                                                                                                                                               <div className="vr-inner">
                                                                                                                                                         <img src={vr.name} alt="/" />
                                                                                                                                                         <span>x{vr.quantity}</span>
                                                                                                                                               </div>
                                                                                                                                               :
                                                                                                                                               <h6>{vr.name} <span>x{vr.quantity}</span></h6>
                                                                                                                                          }
                                                                                                                                         
                                                                                                                               </div>
                                                                                                                          )}
                                                                                                            </div>
                                                                                                            :
                                                                                                             <div className="simple-vars-wrapper">
                                                                                                                    <span>Qty: {item.total_quantity}</span>
                                                                                                             </div>
                                                                                                          }
                                                                                                 </div>
                                                                                       </div>
                                                                            </div>
                                                                            <h2><span className="ksh">ksh.</span>{item.price.toLocaleString()}</h2>
                                                                  </div>
                                                            )}
                                                </div>
                                    </div>

                                    <div className="order-subtotal">
                                               <h4>Subtotal</h4>
                                               <h2><span className="ksh">ksh.</span>{calculateTotal().subtotal.toLocaleString()}</h2>
                                    </div>

                                    <div className="order-subtotal">
                                               <h4>Shipping Fee</h4>
                                               <h2><span className="ksh">ksh.</span>{order.shipping.toLocaleString()}</h2>
                                    </div>
                                    <div className="grand-total">
                                                <h4>Grand Total</h4>
                                                <h2><span className="ksh">ksh.</span>{calculateTotal().grandtotal.toLocaleString()}</h2>
                                    </div>

                                    <div className="continue-shopping">
                                                <button onClick={continueShopping} className="proceed-btn">Continue Shopping</button>
                                    </div>
                        </div>
             </div>
    </div>
  )
}

export default OrderCompleteBody