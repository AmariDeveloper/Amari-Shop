import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go"
import { LiaUserEditSolid } from "react-icons/lia";

const BillingConfirmationBody = () => {
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

                                        
                              </div>
                              <div className="billing-payment">
                                        
                              </div>
                    </div>
             </div>
    </div>
  )
}

export default BillingConfirmationBody