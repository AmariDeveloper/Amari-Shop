import { useContext } from "react";
import { sidebarContext } from "../../../lib/sidebarcontext";
import Topbar from "../../common/Topbar";
import { HiOutlineMenu } from "react-icons/hi"
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryList from "./CategoryList";

const CategoriesBody = () => {
      // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  return (
    <div className="dashboard-body">
              <div className="top-wrapper">
                         <div className="top-texts">
                                   <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                                   </span>
                                  <h2>Product Categories</h2>
                                  <p>Product categories for your store can be managed here.</p>
                         </div>
                         <Topbar />
              </div>

              <div className="categories-row-wrapper">
                        <CategoryCreateForm />
                        <CategoryList />
              </div>
    </div>
  )
}

export default CategoriesBody