import {CgClose} from "react-icons/cg"
import { LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { categories } = useSelector(state => state.utils);
    const parent_categories = categories && categories.filter(item => item.parent === "None");
  return (
    <div className="sidebar-section">
              <div className="sidebar-content">
                        <div className="sidebar-header">
                                 <h3>Menu</h3>
                                 <span><CgClose /></span>
                        </div>

                        <div className="sidebar-menu">
                                   <div className="categories-wrap">
                                             <h4>Categories <span><LuChevronRight /></span></h4>

                                             <div className="categories-wrap-row">
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