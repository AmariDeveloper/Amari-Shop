import { Link, useNavigate } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { shipping } from "../../../data/shipping"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { saveBillingInformation } from "../../../redux/slices/public/billingSlice"
import { setShippingFee } from "../../../redux/slices/public/cartSlice"
const CheckoutBody = () => {
    const { shopping_cart, shipping_fee } = useSelector(state => state.cart);
    const { details } = useSelector(state => state.billing);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
           defaultValues: {
                  firstname: "",
                  lastname: "",
                  email: "",
                  phone: "",
                  subcounty: "",
                  street: ""
           }
    });
 
    useEffect(()=> {
             const defaults = {
                    firstname: details ? details.firstname: "",
                    lastname: details ? details.lastname : "",
                    email: details ? details.email : "",
                    phone: details ? details.phone : "",
                    subcounty: details ? details.subcounty : shipping_fee.subcounty,
                    street: details ? details.street : ""
             }
             reset(defaults)
    }, [details, reset, shipping_fee])

    const totalCostPlusShipping = () => {
          const count = shopping_cart.reduce((acc, curr) => acc+(curr.product_pricing.product_regular_price * curr.quantity), 0)
          return count
    }

    const SaveDetails = (data) => {
           dispatch(saveBillingInformation(data));
           navigate("/checkout/billing-confirmation");
    }

    const switchShippingCost = (val) => {
         const area = shipping.find(item => item.subcounty === val);
         dispatch(setShippingFee({ location: area.subcounty, cost: area.shipping_cost}))
    }
  return (
    <div className="single-product-body">
              <div className="inner-row-2">
                         <div className="single-product-body-content">
                                 <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/cart"}>Cart</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/checkout"} className="product-link">Checkout</Link>
                                   </div>

                                    <div className="cart-body-content">
                                                <p className="login-init">Are you a returning customer? <span>Click here to login</span></p>
                                                <h2 className="billing">Billing Details</h2>
                                                <form onSubmit={handleSubmit(SaveDetails)}>
                                                     <div className="cart-body-row">
                                                           <div className="cart-body-column">
                                                                      <div className="cart-billing-form">
                                                                               <h4>Contact Information</h4>
                                                                                           <div className="form-row split">
                                                                                                     <div className="form-row-column">
                                                                                                                <label htmlFor="firstname">Firstname <span>*</span></label>
                                                                                                                <input type="text" {...register("firstname", { required: "This input is required"})} className="form-control" placeholder="Firstname" />
                                                                                                                <span className="error">{errors.firstname && errors.firstname.message}</span>
                                                                                                     </div>
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="lastname">Lastname <span>*</span></label>
                                                                                                                <input type="text" {...register("lastname", { required: "This input is required"})} className="form-control" placeholder="Lastname" />
                                                                                                                <span className="error">{errors.lastname && errors.lastname.message}</span>
                                                                                                    </div>
                                                                                        </div>
                                                                                        <div className="form-row">
                                                                                                <label htmlFor="email">Email address <span>*</span></label>
                                                                                                <input type="email" {...register("email", { required: "This input is required"})} className="form-control" placeholder="Email address"/>
                                                                                                <span className="error">{errors.email && errors.email.message}</span>
                                                                                        </div>
                                                                                        <div className="form-row">
                                                                                                <label htmlFor="phone">Phone Number <span>*</span></label>
                                                                                                <input type="number" {...register("phone", { required: "This input is required"})} className="form-control" placeholder="+2547xxxxxxx" />
                                                                                                <span className="error">{errors.phone && errors.phone.message}</span>
                                                                                        </div>

                                                                                        <h4>Shipping Address</h4>
                                                                                         <div className="form-row split">
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="country">Country <span>*</span></label>
                                                                                                                <input type="text" {...register("country")} value={"Kenya"} className="form-control" readOnly/>
                                                                                                    </div>
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="country">City<span>*</span></label>
                                                                                                                <input type="text" {...register("city")} value={"Nairobi"} className="form-control" readOnly/>
                                                                                                    </div>
                                                                                         </div>
                                                                                          <div className="form-row">
                                                                                                     <label htmlFor="subcounty">Subcounty</label>
                                                                                                     <select className="form-control" {...register("subcounty", { required: "This input is required", onChange: (e) => switchShippingCost(e.target.value)})}>
                                                                                                                <option value="">Choose Subcounty</option>
                                                                                                                { shipping.map(item => 
                                                                                                                       <option key={item.id}>{item.subcounty}</option>
                                                                                                                )}
                                                                                                     </select>

                                                                                          </div>
                                                                                          <div className="form-row">
                                                                                                     <label htmlFor="street">Street address *</label>
                                                                                                     <input type="text" {...register("street", { required: "This input is required"})} className="form-control" placeholder="Mtaa ni gani?" />
                                                                                                     <span className="error">{errors.street && errors.street.message}</span>
                                                                                          </div>
                                                                      </div>
                                                           </div>
                                                           <div className="cart-body-continue">
                                                                      <div className="cart-order-summary">
                                                                               <h4>Your Order</h4>

                                                                               <div className="products-in-products">
                                                                                          { shopping_cart.map(product => 
                                                                                            <div className="basket-product-moja" key={product._id}>
                                                                                                   <div className="product-details">
                                                                                                                 <img src={product.product_imagery.product_main_image} alt="" />
                                                                                                               <div className="product-detail-texts">
                                                                                                                          <h5>{product.product_title.slice(0, 16)}...</h5>
                                                                                                                           <div className="variations-chosen">
                                                                                                                                       <p>Variations Chosen</p>
                                                                                                                                        <div className="chosen-wrap">
                                                                                                                                                  { product.variations.map(item => 
                                                                                                                                                       <div className="var-items-wrap" key={item.id}>{
                                                                                                                                                           item.name.startsWith("#") ? <div className="var-color-box">
                                                                                                                                                                  <span style={{ background: `${item.name}`}}></span>
                                                                                                                                                           </div>:
                                                                                                                                                           item.name.startsWith("https") ? <div className="var-fabric-box">
                                                                                                                                                                     <img src={item.name} alt="" />
                                                                                                                                                           </div>
                                                                                                                                                           :
                                                                                                                                                           <h6>{item.name}</h6>
                                                                                                                                                       }<span>Qty: {item.quantity}</span>{product.variations.length > 1 ? ",": ""}</div>
                                                                                                                                                 )}
                                                                                                                                        </div>
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

                                                                                          <button type="submit" className="proceed-btn">Proceed to Payment</button>
                                                                               </div>
                                                                      </div>
                                                           </div>
                                                </div>
                                        </form>
                                </div>
                         </div>
              </div>
    </div>
  )
}

export default CheckoutBody