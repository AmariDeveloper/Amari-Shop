import AppNotification from "../../common/AppNotification"
import Topbar from "../../common/Topbar";
import { HiOutlineMenu } from "react-icons/hi"
import { sidebarContext } from "../../../lib/sidebarcontext";
import { useContext } from "react";
const VariationsBody = () => {
          // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  return (
    <div className="dashboard-body">
            <AppNotification />
            <div className="top-wrapper">
                    <div className="top-texts">
                            <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                             </span>
                             <h2>Product Variations</h2>
                             <p>Product variations for your store can be managed here.</p>
                   </div>
                 <Topbar />
            </div>
            <div className="categories-row-wrapper">
                       
            </div>
    </div>
  )
}

export default VariationsBody