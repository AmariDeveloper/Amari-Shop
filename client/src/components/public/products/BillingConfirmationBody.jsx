import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { LiaUserEditSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const BillingConfirmationBody = () => {
  const { details } = useSelector(state => state.billing)
  const { shopping_cart, shipping_fee } = useSelector(state => state.cart);


  const totalCostPlusShipping = () => {
         const count = shopping_cart.reduce((acc, curr) => acc+(curr.product_pricing.product_regular_price * curr.quantity), 0)
         return count
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
                                                <p>Edit<span><LiaUserEditSolid /></span></p>
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

                                         <div className="billing-header">
                                                <h3>Cart Details</h3>
                                                <p>Edit<span><LiaUserEditSolid /></span></p>
                                        </div>
                              </div>
                              <div className="billing-payment">
                                     <div className="cart-order-sticky">
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