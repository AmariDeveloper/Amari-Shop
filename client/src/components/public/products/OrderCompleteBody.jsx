import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const OrderCompleteBody = () => {
    const { details, order } = useSelector(state => state.billing);
    const navigate = useNavigate();
 
    const calculateTotal = () => {
           const count = order.basket.reduce((acc, curr) => acc+curr.price, 0)
           const grandT = count + order.shipping

           return { subtotal: count, grandtotal: grandT}
    }
  return (
    <div className="order-completion-body">
             <div className="inner-row-2">
                        <div className="completion-box">
                                    <div className="completion-icon">
                                               
                                    </div>
                                    <h3>Thanks for your Order!</h3>
                                    <p>The order confirmation has been sent to {details.email}</p>

                                    <div className="extra-details">
                                                <div className="extra-detail-row">
                                                           <h4>Transaction Date</h4>
                                                           <h5>Thursday, November 18, 2024</h5>
                                                </div>
                                                <div className="extra-detail-row">
                                                           <h4>Payment Method</h4>
                                                           <h5>M-Pesa xxxxxxx345</h5>
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
                                                <button onClick={() => navigate("/")} className="proceed-btn">Continue Shopping</button>
                                    </div>
                        </div>
             </div>
    </div>
  )
}

export default OrderCompleteBody