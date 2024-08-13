import { useContext, useEffect } from "react";
import { sidebarContext } from "../../../lib/sidebarcontext";
import Topbar from "../../common/Topbar";
import { HiOutlineMenu } from "react-icons/hi"
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryList from "./CategoryList";
import AppNotification from "../../common/AppNotification";
import { useGetCategoriesQuery } from "../../../redux/slices/productSlice";
import { setCategories } from "../../../redux/slices/utilSlice";
import { useDispatch } from "react-redux";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoriesBody = () => {
      // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  const { data } = useGetCategoriesQuery({ refetchOnMountOrArgChange: true })
   const dispatch = useDispatch();
  useEffect(() => {
          if(data){
                 dispatch(setCategories([...data.categories]))
          }
  }, [data, dispatch])

  return (
    <div className="dashboard-body">
              <AppNotification />
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
                        <CategoryList  />
              </div>

              <EditCategoryModal />
              <DeleteCategoryModal />
    </div>
  )
}

export default CategoriesBody