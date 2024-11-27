import { useContext, useRef, useEffect, useState } from "react";
import {CgClose} from "react-icons/cg"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { publicSidebarContext } from "./publicnavcontext";
import gsap from "gsap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi2";
import { saveRedirect } from "../../../../redux/slices/public/clientSlice";
import SidebarProfileBar from "./SidebarProfileBar";

const Sidebar = () => {
    const [ sidebarStatus, setSidebarStatus ] = useContext(publicSidebarContext);
    const { categories } = useSelector(state => state.utils);
    const { session } = useSelector(state => state.client);
    const [sidebarTitle, setSidebarTitle] = useState("Menu");
    const [ tabStatus, setTabStatus ] = useState(false)
    const parent_categories = categories && categories.filter(item => item.parent === "None");
    const sidebarRef = useRef();
    const closeSidebar = () => setSidebarStatus(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();


    useEffect(() => {
      if(sidebarStatus){
              sidebarRef && sidebarRef.current.classList.add("active");
              const tl = gsap.timeline();
              tl.to(sidebarRef.current.querySelector(".sidebar-content"), {
                     x: 0,
                     duration: 1
              })
      }else{
             const tl = gsap.timeline();
                tl.to(sidebarRef.current.querySelector(".sidebar-content"), {
                     x: "-100%",
                     duration: 1
                })
               setTimeout(() => {
                    sidebarRef.current.classList.remove("active")
               }, 1200)
      }
}, [sidebarStatus])

//view all categories and change title
const openMoreCategories = () => {
       setTabStatus(true);
       setSidebarTitle("Categories");
}

//close all categories tab and change title
const closeMoreCategories = () => {
      setTabStatus(false);
      setSidebarTitle("Menu")
}

//open Login page
const openLogin = () => {
      navigate("/session/new");
      dispatch(saveRedirect(pathname))
}
  return (
    <div ref={sidebarRef} className="sidebar-section">
              <div className="sidebar-content">
                        <div className="sidebar-header">
                                 <h3><span onClick={closeMoreCategories} className={tabStatus ? "active" : ""}><LuChevronLeft /></span> {sidebarTitle}</h3>
                                 <span onClick={closeSidebar}><CgClose /></span>
                        </div>

                        <div className="sidebar-menu">
                                   <div className="categories-wrap">
                                             <h4 onClick={openMoreCategories}>Categories <span><LuChevronRight /></span></h4>

                                             {/* <div className="sidebar-categories-row">
                                                        { categories && parent_categories && parent_categories.slice(0, 8).map(category => 
                                                               <div className="category-moja" key={category._id}>
                                                                        <img src={category.thumbnail} alt="" />
                                                                        <h3>{category.name}</h3>
                                                               </div>
                                                        )}
                                             </div> */}
                                   </div>
                                   <div className="sidebar-links">
                                             <ul>
                                                        <li><Link to={"/shop"}>Shop</Link></li>
                                                        <li><Link to={"/about"}>About</Link></li>
                                                        <li><Link to={"/supplier/new"}>Supplier Registration</Link></li>
                                             </ul>
                                   </div>
                                   <div className="profile-wrap">
                                              { session.isLoggedIn ? 
                                                     <SidebarProfileBar func={setSidebarTitle} />
                                                     :
                                                   <div className="profile-box-account" onClick={openLogin}>
                                                             <span><HiOutlineUserCircle /></span>
                                                             <h3>Sign In</h3>
                                                   </div>
                                               }
                                   </div>

                                   <div className={ tabStatus ? "all-categories-list active" : "all-categories-list"}>
                                             <h4>All Categories</h4>
                                             <ul>
                                                       { parent_categories && parent_categories.map(parent_category => 
                                                              <li key={parent_category._id}>
                                                                        <Link to={"/"}>{parent_category.name}</Link>
                                                                         <ul>
                                                                                  { categories.filter(item => item.parent === parent_category.name).map(sub =>
                                                                                        <li key={sub._id}>
                                                                                                 <Link to={"/"}>{sub.name}</Link>
                                                                                        </li>
                                                                                  )}
                                                                         </ul>
                                                              </li>
                                                       )}
                                             </ul>
                                   </div>
                        </div>
                        

              </div>
    </div>
  )
}

export default Sidebar