import { useContext, useRef, useEffect } from "react";
import {CgClose} from "react-icons/cg"
import { LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import { publicSidebarContext } from "./publicnavcontext";
import gsap from "gsap"

const Sidebar = () => {
    const [ sidebarStatus, setSidebarStatus ] = useContext(publicSidebarContext);
    const { categories } = useSelector(state => state.utils);
    const parent_categories = categories && categories.filter(item => item.parent === "None");
    const sidebarRef = useRef();
    const closeSidebar = () => setSidebarStatus(false);

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
  return (
    <div ref={sidebarRef} className="sidebar-section">
              <div className="sidebar-content">
                        <div className="sidebar-header">
                                 <h3>Menu</h3>
                                 <span onClick={closeSidebar}><CgClose /></span>
                        </div>

                        <div className="sidebar-menu">
                                   <div className="categories-wrap">
                                             <h4>Categories <span><LuChevronRight /></span></h4>

                                             <div className="sidebar-categories-row">
                                                        { categories && parent_categories.slice(0, 8).map(category => 
                                                               <div className="category-moja" key={category._id}>
                                                                        <img src={category.thumbnail} alt="" />
                                                                        <h3>{category.name}</h3>
                                                               </div>
                                                        )}
                                             </div>
                                   </div>
                        </div>
                        
              </div>
    </div>
  )
}

export default Sidebar