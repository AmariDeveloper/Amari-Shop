import { Link, NavLink, useParams } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { CiBoxes } from "react-icons/ci";
import { BsBasket } from "react-icons/bs";
import { PiUsersFourLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import logo from "../../../assets/logo.png"
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { sidebarContext } from "../../../lib/sidebarcontext";
import { GoPlus } from "react-icons/go";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { TbBrandStackoverflow } from "react-icons/tb";
import { BsTags } from "react-icons/bs";
import { IoOptionsSharp } from "react-icons/io5";
import { useSelector } from "react-redux"

const Sidebar = () => {
  const [ sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  const { userInfo } = useSelector(state => state.auth)
  const sidebarRef = useRef();
  const [productOption, setProductOption] = useState(false);

  const handleOutsideClick = useCallback((e) => {
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
              setSidebarStatus(false)
        }else{
             setSidebarStatus(true)
        }
  }, [setSidebarStatus])

  useEffect(() => {
            document.addEventListener("click", handleOutsideClick, true);
  }, [handleOutsideClick])

 const toggleOptions = () => setProductOption(!productOption);
 const closeOptions = () => {
        setProductOption(false)
 }

 //sanitize url switch and optionbox

 const { name } = useParams();
 useEffect(() => {
       const product_options = ["categories", "brands", "variations", "tags"];
        if(product_options.includes(name)){
              setProductOption(true)
        }
 }, [name])
  return (
    <div ref={sidebarRef} className={sidebarStatus ? "sidebar-wrapper active" : "sidebar-wrapper"}>
                <div className="sidebar-inner">
                           <Link to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/dashboard`} className="logo">
                                   <img src={logo} alt="" />
                          </Link>
                          <nav>
                                   <ul>
                                               <li onClick={closeOptions}><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/dashboard`}><span><RxDashboard /></span> Dashboard</NavLink></li>
                                               <li><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/analytics`}><span><HiOutlinePresentationChartLine /></span>Overview</NavLink></li>
                                               <li onClick={toggleOptions} className="dropy"><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/products`}><span><CiBoxes /></span>Products</NavLink>  <span onClick={toggleOptions} className="plus"><GoPlus /></span>
                                               </li>
                                               <div className={ productOption ? "dropdown active" : "dropdown"}>
                                                           <ul>
                                                                   <li><Link className={name === "categories" ? "active": ""} to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/products/categories`}><span><HiOutlineRectangleStack /></span>Categories</Link></li>
                                                                    <li><Link className={name === "brands" ? "active": ""} to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/products/brands`}><span><TbBrandStackoverflow /></span>Brands</Link></li>
                                                                    <li><Link className={name === "variations" ? "active": ""}   to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/products/variations`}><span><IoOptionsSharp /></span>Variations</Link></li>
                                                                    <li><Link className={name === "tags" ? "active": ""}  to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/products/tags`}><span><BsTags /></span>Tags</Link></li>
                                                            </ul>
                                               </div>
                                               <li><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/orders`}><span><BsBasket /></span>Orders</NavLink></li>
                                              <li><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/customers`}><span><PiUsersFourLight /></span>Customers</NavLink></li>
                                              <li><NavLink to={`/user/${userInfo.username === "@" ? userInfo.id : userInfo.username}/settings`}><span><IoSettingsOutline /></span>Settings</NavLink></li>
                                    </ul>

                                   <div className="extras">
                                              <Link to={"/"}><span><IoIosHelpCircleOutline /></span>Help Center</Link>
                                              <button><span><AiOutlinePoweroff /></span>Logout</button>
                                   </div>
                          </nav>
                </div>
    </div>
  )
}

export default Sidebar