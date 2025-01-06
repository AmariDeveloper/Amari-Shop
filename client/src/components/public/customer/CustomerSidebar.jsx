import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

const CustomerSidebar = () => {
  return (
    <div className="customer-sidebar">
                 <span className="mobile-trig"><HiOutlineMenuAlt1 /></span>

                 <div className="customer-sidebar-content">
                           <h3>My Account</h3>
                           <ul>
                                   <li><Link to={"/"} className="active">Overview</Link></li>
                                   <li><Link to={"/"}>Orders</Link></li>
                                   <li><Link to={"/"}>Track Order</Link></li>
                                   <li><Link to={"/"}>Feedback</Link></li>
                                   <li><Link to={"/"}>Shipping Address</Link></li>
                                   <li><Link to={"/"}>Login & Security</Link></li>
                           </ul>
                 </div>
    </div>
  )
}

export default CustomerSidebar