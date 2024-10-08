import logo from "../../../../assets/logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi2";
import CategoriesDropdown from "./CategoriesDropdown";
import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { openShoppingCartSidebar } from "../../../../redux/slices/public/cartSlice";
import ShoppingCartModal from "../products/ShoppingCartModal";
import { saveRedirect } from "../../../../redux/slices/public/clientSlice";


const Header = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const { shopping_cart } = useSelector(state => state.cart);
 const dispatch = useDispatch();
 const { pathname } = useLocation();

 const openShoppingBasket = () => dispatch(openShoppingCartSidebar());

 const navigate = useNavigate();
 const openLogin = () => {
       navigate("/session/new");
       dispatch(saveRedirect(pathname))
 }
  return (
    <>
        <header>
            <div className="inner-row-2">
                        <div className="header-content">
                                    <div className="mobile-menu-btn">
                                                <span className="menu-btn"><CgMenuLeft /></span>
                                                <span className="spacer"></span>
                                    </div>
                                   <div className="flex-item-column">
                                             <Link to={"/"} className="logo-item">
                                                     <img src={logo} alt="" className="logo" />
                                              </Link>
                                              <nav>
                                                        <span className="menu-btn"><CgMenuLeft /></span>
                                                       <div className="head-categories">
                                                                <div className={dropdownStatus ? "head-categories-wrap active" : "head-categories-wrap"} onClick={() => setDropdownStatus(!dropdownStatus)}>
                                                                        Categories 
                                                                        <span><HiChevronDown /></span>
                                                                </div>
                                                                <CategoriesDropdown status={dropdownStatus} handleStatus={setDropdownStatus} />
                                                       </div>
                                                       <ul>
                                                                 <li><Link to={"/"}>Shop</Link></li>
                                                                 <li><Link to={"/about"}>About</Link></li>
                                                               <li><Link to={"/"}>Deals</Link></li>
                                                               <li><Link to={"/"}>New & Featured</Link></li>
                                                               
                                                       </ul>
                                              </nav>
                                   </div>
                                   <div className="right flex-item-column">
                                            <div className="box account" onClick={openLogin}>
                                                      <span><HiOutlineUserCircle /></span>
                                                      <h3>Sign In</h3>
                                            </div>
                                            <div className="box search">
                                                      <span><GoSearch /></span>
                                            </div>
                                            <div className="box" onClick={openShoppingBasket}>
                                                      <span><HiOutlineShoppingCart /></span>
                                                      <figure>{shopping_cart.length}</figure>
                                            </div>
                                   </div>
                        </div>
            </div>

    </header>
           <ShoppingCartModal />
    </> 
  )
}

export default Header