import CustomerSidebar from "./CustomerSidebar";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import profileImg from "../../../assets/blank-profile.webp"
import wishlist from "../../../assets/wishlist.png"
import viewed from "../../../assets/trolley.png"
import coupons from "../../../assets/voucher.png"

const CustomerAccountBody = () => {
  const { session } = useSelector(state => state.client);

  const firstname = session && session.profile.name.split(" ")[0];
  return (
    <div className="customer-account-body">
            <div className="inner-row-2">
                       <div className="account-body">
                                <div className="quick-links-strip">
                                       <Link to={"/"}>Home</Link>
                                       <span><GoChevronRight /></span>
                                       <Link to={`/${firstname.toLowerCase()}/my-account`} className="customer-link">My Account</Link>
                               </div>
                              <div className="customer-account-wrapper">
                                         <CustomerSidebar />
                                        <div className="customer-account-row">          
                                                       <div className="customer-account-header">
                                                                <div className="account-image">
                                                                         { session && session.profile ? 
                                                                               <img src={session.profile.profileImage} alt="Customer Image" /> :
                                                                               <img src={profileImg} alt="" />
                                                                          }
                                                                </div>
                                                                <div className="account-customer-details">
                                                                         <h4>{ session && session.profile.name}</h4>
                                                                         <p>{session && session.profile.email}</p>
                                                                </div>
                                                       </div>
                                                       <div className="customer-account-summary">
                                                                 <div className="account-summary-moja">
                                                                             <img src={wishlist} alt="" />
                                                                             <h3>Wishlist</h3>
                                                                 </div>
                                                                 <div className="account-summary-moja">
                                                                             <img src={viewed} alt="" />
                                                                             <h3>Recently Viewed</h3>
                                                                 </div>
                                                                 <div className="account-summary-moja">
                                                                             <img src={coupons} alt="" />
                                                                             <h3>Coupons</h3>
                                                                 </div>
                                                       </div>
                                        </div>
                      </div>
                       </div>
            </div>
    </div>
  )
}

export default CustomerAccountBody