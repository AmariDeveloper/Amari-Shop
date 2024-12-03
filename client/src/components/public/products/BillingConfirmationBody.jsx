import { Link, useNavigate } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { LiaUserEditSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
//import mpesalogo from "../../../assets/mpesa.png"
import visa from "../../../assets/visa.png"
import mastercard from "../../../assets/mastercard.png"
import { GoChevronDown } from "react-icons/go";
import {  useState } from "react";
import { clearShoppingCart } from "../../../redux/slices/public/cartSlice";
import { saveOrderInformation } from "../../../redux/slices/public/billingSlice";
import { useForm } from "react-hook-form";
import { useProcessPaymentsMutation } from "../../../redux/slices/public/actionSlice";
const BillingConfirmationBody = () => {
  const { details } = useSelector(state => state.billing)
  const { shopping_cart, shipping_fee } = useSelector(state => state.cart);
 const [ activePaymentMethod, setActivePaymentMethod ] = useState(0);
 const { register, handleSubmit, formState: { errors }} = useForm();
 const [ cardType, setCardType ] = useState("");
 const [ cardError, setCardError ] = useState("");
 const [cvcError, setCVCError] = useState("");
 const [ dateError, setDateError ] = useState("")
 //const inputRef = useRef();
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const totalCostPlusShipping = () => {
         const count = shopping_cart.reduce((acc, curr) => acc+(curr.product_pricing.product_regular_price * curr.quantity), 0)
         return count
 }
// const prefillExisitingPhoneNumber = () => {
//        inputRef.current.value = details.phone
// }

const normalizeCardNumber = (val) => {
     if(val.startsWith(4)){
           setCardType("Visa");
           setCardError("")
     }else if(val.startsWith(5)){
           setCardType("Mastercard");
           setCardError("")
     }else{
           setCardType("")
           setCardError("Invalid  visa or mastercard number.")
     }
     return val.replace(/\s/g, "").match(/.{1,4}/g)?.join("  ").substring(0, 22) || ''
}

const normalizeMonthExpiryDate = (val) => {
        const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09","10",
                                                 "1", "2", "3", "4", "5", "6", "7", "8", "9", 
                                                 "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
                                                 "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
        if(monthArray.includes(val)){
                setDateError("")
        } else{
                setDateError("Invalid month date");
        }

        return val.substring(0, 2);
}

const normalizeYearExpiryDate = (val) => {
         if(val > 24 && val < 40){
                setDateError("")
         }else{
                 setDateError("Invalid year entered")
         }

         return val.substring(0, 2)
}

const normalizeCVCValue = (val) => {
        if(val.length < 3){
                setCVCError("Please input correct security code!")
        }else{
                setCVCError("")
        }
        if(isNaN(val)){
                setCVCError("Incorrect code format")
        }else{
                setCVCError('')
        }

        return val.substring(0, 3)
}


const [ HandlePayment, { isLoading }] = useProcessPaymentsMutation();

const PurchaseCompletion = async(data) => {
        
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
                shipping: shipping_fee.cost,
                grandTotal: totalCostPlusShipping(),
                card: data
        }

        try {
                const res = await HandlePayment(payload).unwrap();
                
        } catch (error) {
                console.log(error)
        }

        // dispatch(saveOrderInformation(payload))
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
                                        </div>
                                        <div className="billing-method">
                                                   {/* <h3>Select Payment Method</h3> */}
                                                   <h3>Available payment option</h3>
                                                   <div className="billing-method-row">
                                                               {/* <div className={activePaymentMethod === 0  ? "billing-method-moja active" : "billing-method-moja"}>
                                                                         <div className="billing-method-header" onClick={() => setActivePaymentMethod(0)}>
                                                                                  <h4>Pay with M-Pesa</h4>
                                                                                  <span><GoChevronDown /></span>
                                                                         </div>
                                                                         <div className="billing-method-details">
                                                                                   <div className="billing-method-inner">
                                                                                               <img src={mpesalogo} alt="" />
                                                                                               <div className="billing-method-input-row">
                                                                                                          <label htmlFor="stmt">Enter your mpesa number <span onClick={prefillExisitingPhoneNumber}>Prefill</span></label>
                                                                                                         <input ref={inputRef} type="number" className="input-control" placeholder="+254712xxxxx" />
                                                                                               </div>
                                                                                   </div>
                                                                         </div>
                                                               </div> */}
                                                               <div className={ activePaymentMethod === 1 ? "billing-method-moja active" : "billing-method-moja"} onClick={() => setActivePaymentMethod(1)}>
                                                                        <div className="billing-method-header">
                                                                                  <h4>Pay with Card</h4>
                                                                                  <span><GoChevronDown /></span>
                                                                         </div>
                                                                         <div className="billing-method-details">
                                                                                   <div className="billing-method-inner">
                                                                                            <form onSubmit={handleSubmit(PurchaseCompletion)}>
                                                                                                      <div className="billing-form-row">
                                                                                                                 <label htmlFor="card number">Card number</label>
                                                                                                                 <div className="billing-input">
                                                                                                                           <input 
                                                                                                                                  type="tel" 
                                                                                                                                  inputMode="numeric"
                                                                                                                                  placeholder="1480 8580 0499 0004" 
                                                                                                                                  { ...register("card_number", {
                                                                                                                                          onChange: (event) => {
                                                                                                                                                const { value } = event.target;
                                                                                                                                                event.target.value = normalizeCardNumber(value)
                                                                                                                                          },
                                                                                                                                          required: "Card number is required to process payment"
                                                                                                                                  })}
                                                                                                                                  />

                                                                                                                            <div className="card-type">
                                                                                                                                       { cardType === "Visa" ?
                                                                                                                                             <img src={visa} alt="visa card"  />
                                                                                                                                        :  cardType === "Mastercard" ?
                                                                                                                                             <img src={mastercard} alt="mastercard" />
                                                                                                                                        :
                                                                                                                                            <div className="empty-card"></div>                    
                                                                                                                                        }
                                                                                                                            </div>
                                                                                                                 </div>
                                                                                                                 <span className="error">{errors.card_number && errors.card_number.message }</span>
                                                                                                                 <span className="error">{cardError}</span>
                                                                                                      </div>

                                                                                                      <div className="billing-form-row split">
                                                                                                                  <div className="billing-form-column">
                                                                                                                                <label htmlFor="expiry date">Expiry Date</label>
                                                                                                                                        <div className="date-input-row">
                                                                                                                                                    <input type="tel" 
                                                                                                                                                           placeholder="07"
                                                                                                                                                           inputMode="numeric"
                                                                                                                                                           {...register("card_month", {
                                                                                                                                                                 onChange: (event) => {
                                                                                                                                                                         const { value } = event.target;
                                                                                                                                                                         event.target.value = normalizeMonthExpiryDate(value)
                                                                                                                                                                 },
                                                                                                                                                                 required: "Invalid expiry date"
                                                                                                                                                           })}/>
                                                                                                                                                    <span>/</span>
                                                                                                                                                    <input type="tel" 
                                                                                                                                                              placeholder="25"
                                                                                                                                                              inputMode="numeric"
                                                                                                                                                              {...register("card_year", {
                                                                                                                                                                    onChange: (event) => {
                                                                                                                                                                            const { value } = event.target;
                                                                                                                                                                            event.target.value = normalizeYearExpiryDate(value)
                                                                                                                                                                    },
                                                                                                                                                                    required: "Invalid expiry date"
                                                                                                                                                              })}
                                                                                                                                                              />
                                                                                                                                        </div>
                                                                                                                                <span className="error">{errors.card_month && errors.card_month.message}</span>
                                                                                                                                <span className="error">{errors.card_year && errors.card_year.message}</span>
                                                                                                                                <span className="error">{dateError}</span>
                                                                                                                  </div>
                                                                                                                  <div className="billing-form-column">
                                                                                                                              <label htmlFor="Security Code">Security Code</label>
                                                                                                                              <input 
                                                                                                                                    type="tel"
                                                                                                                                    inputMode="numeric"
                                                                                                                                    placeholder="CVC"
                                                                                                                                    {...register("cvc_code", {
                                                                                                                                             onChange: (event) => {
                                                                                                                                                   const { value } = event.target;
                                                                                                                                                   event.target.value = normalizeCVCValue(value)
                                                                                                                                             },
                                                                                                                                             required: "Security code input is required!"
                                                                                                                                    })}
                                                                                                                                />
                                                                                                                                <span className="error">{errors.cvc_code && errors.cvc_code.message}</span>
                                                                                                                                <span className="error">{cvcError}</span>
                                                                                                                  </div>
                                                                                                      </div>


                                                                                                      <button className="proceed-btn complete">Complete Purchase</button>
                                                                                            </form>
                                                                                   </div>
                                                                         </div>
                                                               </div>
                                                   </div>

                                                
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