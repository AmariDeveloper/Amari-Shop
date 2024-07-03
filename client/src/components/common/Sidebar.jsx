import { Link, NavLink } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { CiBoxes } from "react-icons/ci";
import { BsBasket } from "react-icons/bs";
import { PiUsersFourLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";

import logo from "../../assets/logo.png"
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
              <Link to={'/'} className="logo">
                        <img src={logo} alt="" />
               </Link>
               <nav>
                        <ul>
                                   <li><NavLink to={"/user/666b4e300b7a9ee5378cb04b/dashboard"}><span><RxDashboard /></span> Dashboard</NavLink></li>
                                   <li><NavLink to={"/"}><span><HiOutlinePresentationChartLine /></span>Overview</NavLink></li>
                                   <li><NavLink to={"/"}><span><CiBoxes /></span>Products</NavLink></li>
                                   <li><NavLink to={"/"}><span><BsBasket /></span>Orders</NavLink></li>
                                   <li><NavLink to={"/"}><span><PiUsersFourLight /></span>Customers</NavLink></li>
                                   <li><NavLink to={"/"}><span><IoSettingsOutline /></span>Settings</NavLink></li>
                        </ul>

                        <div className="extras">
                                   <Link to={"/"}><span><IoIosHelpCircleOutline /></span>Help Center</Link>
                                   <button><span><AiOutlinePoweroff /></span>Logout</button>
                        </div>
               </nav>
    </div>
  )
}

export default Sidebar