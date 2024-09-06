import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { shipping } from "../../../data/shipping"
import { useSelector } from "react-redux"
const CheckoutBody = () => {
    const { shopping_cart, shipping_fee } = useSelector(state => state.cart);

    const totalCostPlusShipping = () => {
          const count = shopping_cart.reduce((acc, curr) => acc+(curr.product_pricing.product_regular_price * curr.quantity), 0)
          return count
    }

    console.log(totalCostPlusShipping());
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
                                                <form>
                                                     <div className="cart-body-row">
                                                           <div className="cart-body-column">
                                                                      <div className="cart-billing-form">
                                                                               <h4>Contact Information</h4>
                                                                                           <div className="form-row split">
                                                                                                     <div className="form-row-column">
                                                                                                                <label htmlFor="firstname">Firstname <span>*</span></label>
                                                                                                                <input type="text" className="form-control" placeholder="Firstname" />
                                                                                                     </div>
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="lastname">Lastname <span>*</span></label>
                                                                                                                <input type="text" className="form-control" placeholder="Lastname" />
                                                                                                    </div>
                                                                                        </div>
                                                                                        <div className="form-row">
                                                                                                <label htmlFor="email">Email address <span>*</span></label>
                                                                                                <input type="email" className="form-control" placeholder="Email address"/>
                                                                                        </div>
                                                                                        <div className="form-row">
                                                                                                <label htmlFor="phone">Phone Number <span>*</span></label>
                                                                                                <input type="number" className="form-control" placeholder="Phone number" />
                                                                                        </div>

                                                                                        <h4>Shipping Address</h4>
                                                                                         <div className="form-row split">
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="country">Country <span>*</span></label>
                                                                                                                <input type="text" value={"Kenya"} className="form-control" readOnly/>
                                                                                                    </div>
                                                                                                    <div className="form-row-column">
                                                                                                                <label htmlFor="country">City<span>*</span></label>
                                                                                                                <input type="text" value={"Nairobi"} className="form-control" readOnly/>
                                                                                                    </div>
                                                                                         </div>
                                                                                          <div className="form-row">
                                                                                                     <label htmlFor="subcounty">Subcounty</label>
                                                                                                     <select className="form-control">
                                                                                                                <option value="">Choose Subcounty</option>
                                                                                                                { shipping.map(item => 
                                                                                                                       <option key={item.id}>{item.subcounty}</option>
                                                                                                                )}
                                                                                                     </select>
                                                                                          </div>
                                                                                          <div className="form-row">
                                                                                                     <label htmlFor="street">Street address</label>
                                                                                                     <input type="text" className="form-control" placeholder="Mtaa ni gani?" />
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
                                                                                                                                                       <h6 key={item.id}>{item.name}:<span>Qty: {item.quantity}</span>{product.variations.length > 1 ? ",": ""}</h6>
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

                                                                                          <button className="proceed-btn">Proceed to Payment</button>
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