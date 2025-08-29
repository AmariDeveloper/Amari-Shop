import { Link, useNavigate, } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import billingImg from "../../../assets/receipt.png"
import { saveOrderInformation } from "../../../redux/slices/public/billingSlice";
import { useCreateNewOrderMutation, useProcessPaymentsMutation } from "../../../redux/slices/public/actionSlice";
import { setAppNotification } from "../../../redux/slices/utilSlice";
import { useState } from "react";
import Spinner1 from "../../backend/common/Spinner1";
const BillingConfirmationBody = () => {
  const { details, orderId } = useSelector(state => state.billing)
  const { shopping_cart, shipping_fee } = useSelector(state => state.cart);
 const [payStatus, setPayStatus] = useState(false)
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const totalCostPlusShipping = () => {
         const count = shopping_cart.reduce((acc, curr) => acc+(curr.product_pricing.product_regular_price * curr.quantity), 0)
         return count
 }

const [ HandlePayment] = useProcessPaymentsMutation();
const [ createOrder, {isLoading} ] = useCreateNewOrderMutation();

const PurchaseCompletion = async() => {
        // setPayStatus(true)
        const basketOrder = shopping_cart.map(product => {
                const order_details = {
                        title: product.product_title,
                        id: product._id,
                        price: product.product_pricing.product_regular_price*product.quantity,
                        total_quantity: product.quantity,
                        variations: product.variations,
                        main_image: product.product_imagery.product_main_image,
                }
                return order_details;
        })
        const payload = {
                basket: basketOrder,
                ...details,
                orderId: orderId,
                shipping: shipping_fee.cost,
                grandTotal: totalCostPlusShipping()+shipping_fee.cost,
        }

        try {
                const res = await createOrder(payload).unwrap();
                if(res.error){
                     dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
                }else{
                       setPayStatus(true);
                       const paymentResult = await HandlePayment(res.payment_payload).unwrap();
                       if(paymentResult.error){
                              dispatch(setAppNotification({ status: true, message: paymentResult.error.data.message, type: "Error"}))
                       }
                       if(paymentResult){
                            setTimeout(() => {
                                 window.location.href = `https://secure.3gdirectpay.com/payv3.php?ID=${paymentResult.message}`
                            }, 1000)
                       }

                       dispatch(saveOrderInformation(payload))
                }
        } catch (error) {
                console.log(error);
        }

        // navigate("/checkout/order-complete-confirmation")
        // dispatch(clearShoppingCart());
}


  return (
    <div className="single-product-body">
             <div className="inner-row-2">
                      <div className="quick-links-strip">
                              <Link to={"/"}>Home</Link>
                              <span><GoChevronRight /></span>
                              <Link to={"/cart"}>Cart</Link>
                              <span><GoChevronRight /></span>
                              <Link to={"/checkout"}>Checkout</Link>
                              <span><GoChevronRight /></span>
                              <Link to={"/checkout/billing-confirmation"}>Billing Confirmation</Link>
                    </div>

                     <div className={payStatus ? "billing-loader active" : "billing-loader"}>
                                  <div className="billing-circle">
                                            <div className="billing-loader-wrap"></div>
                                            <img src={billingImg} alt="" />
                                  </div>
                                 <div className="billing-loader-texts">
                                            <h3>Payment Process has been Initiated!</h3>
                                            <p>You will be redirected shortly to DPO Pay page to complete payment. Thank you.</p>
                                 </div>
                     </div>
                    <div className="billing-confirmation-body">
                              <div className="billing-confirmation-column">
                                        <h2>Review your billing and cart details to continue</h2>

                                        <div className="billing-header">
                                                <h3>Billing Details</h3>
                                                <p onClick={() => navigate("/checkout")}>Edit<span><LiaUserEditSolid /></span></p>
                                        </div>

                                         <div className="billing-info-row">
                                                    <div className="billing-row">
                                                            <label htmlFor="fullname">Full Name</label>
                                                            <h4>{`${details.firstname} ${details.lastname}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="email">Email</label>
                                                            <h4>{`${details.email}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="phone">Phone number</label>
                                                            <h4>{`${details.phone}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="address">Address Details</label>
                                                            <h4>{`${details.street}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="country">Country</label>
                                                            <h4>{`${details.country}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="city">City</label>
                                                            <h4>{`${details.city}`}</h4>
                                                    </div>
                                                    <div className="billing-row">
                                                            <label htmlFor="subcounty">Subcounty</label>
                                                            <h4>{`${details.subcounty}`}</h4>
                                                    </div>
                                         </div>

                                         <div className="billing-header-2">
                                                <h3>Payment Details</h3>
                                                <p>Complete your purchase by providing your payment details.</p>

                                                <button className="proceed-btn complete" onClick={PurchaseCompletion}>{ isLoading ? <Spinner1 /> : "Complete Purchase"}</button>
                                        </div>
                              </div>
                              <div className="billing-payment">
                                     <div className="cart-order-sticky">
                                          <div className="cart-order-summary">
                                                 <h4>Your Order  <span onClick={() => navigate("/cart")}><LiaUserEditSolid />Edit</span></h4>
                                                 <div className="products-in-products">
                                                            { shopping_cart.map(product => 
                                                             <div className="basket-product-moja" key={product._id}>
                                                                    <div className="product-details">
                                                                                  <img src={product.product_imagery.product_main_image} alt="" />
                                                                                <div className="product-detail-texts">
                                                                                            <h5>{product.product_title.slice(0, 16)}...</h5>
                                                                                            <div className="variations-chosen">
                                                                                                    { product.variations && product.variations.length > 0 && <p>Variations Chosen</p> }
                                                                                                      { product.variations && product.variations.length > 0 ?
                                                                                                           <div className="chosen-wrap">
                                                                                                             { product.variations.map(item => 
                                                                                                                            <div className="var-items-wrap" key={item.id}>
                                                                                                                                {  item.name.startsWith("#") ? <div className="var-color-box">
                                                                                                                                    <span style={{ background: `${item.name}`}}></span>
                                                                                                                             </div>:
                                                                                                                             item.name.startsWith("https") ? 
                                                                                                                              <div className="var-fabric-box">
                                                                                                                                         <img src={item.name} alt="" />
                                                                                                                                  </div>
                                                                                                                            :
                                                                                                                            <h6>{item.name}</h6>
                                                                                                                           }<span>Qty: {item.quantity}</span>{product.variations.length > 1 ? ",": ""}</div>
                                                                                                                         )}
                                                                                                                </div>
                                                                                                                 :
                                                                                                                <div className="simple-wrap">
                                                                                                                          <span>Qty: {product.quantity}</span>
                                                                                                                </div>
                                                                                                        }
                                                                                            </div>
                                                                                </div>
                                                                    </div>
                                                                    <h2><span className="ksh">ksh.</span>{(product.product_pricing.product_regular_price * product.quantity).toLocaleString()}</h2>
                                                           </div>
                                                            )}
                                                 </div>
                                                 <div className="calculation-wrapper">
                                                            <div className="calculation-column">
                                                                       <h5>Subtotal</h5>
                                                                        <h2><span className="ksh">ksh.</span>{totalCostPlusShipping().toLocaleString()}</h2>
                                                            </div>
                                                            <div className="calculation-column">
                                                                          <h5>Shipping fee</h5>
                                                                          <h2><span className="ksh">ksh.</span>{shipping_fee.cost}</h2>
                                                             </div>
                                                             <div className="total-calculation-column">
                                                                         <h5>Grand Total</h5>
                                                                         <h2><span className="ksh">ksh.</span>{(totalCostPlusShipping()+shipping_fee.cost).toLocaleString()}</h2>
                                                            </div>
                                                  </div>
                                         </div>
                                    </div>
                              </div>
                    </div>
             </div>
    </div>
  )
}

export default BillingConfirmationBody