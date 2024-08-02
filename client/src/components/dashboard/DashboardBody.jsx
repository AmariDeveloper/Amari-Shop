import { useContext } from "react"
import Footer from "../common/Footer"
import Topbar from "../common/Topbar"
import ExtraInfo from "./ExtraInfo"
import PopularProducts from "./PopularProducts"
import ShopAnalytics from "./ShopAnalytics"
import SummaryStrip from "./SummaryStrip"
import { HiOutlineMenu } from "react-icons/hi";
import { sidebarContext } from "../../lib/sidebarcontext"

const DashboardBody = () => {
  // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
  return (
    <div className="dashboard-body">
              <div className="top-wrapper">
                         <div className="top-texts">
                                   <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                                   </span>
                                  <h2>Welcome Back, Efron</h2>
                                  <p>Here&apos;s what&apos;s happening with your store today</p>
                         </div>
                         <Topbar />
              </div>

               <SummaryStrip />
               <div className="dashboard-split">
                          <div className="dashboard-split-big">
                                 <ShopAnalytics />

                                 <PopularProducts />
                          </div>
                          <div className="dashboard-split-small">
                                    <ExtraInfo />
                          </div>
               </div>

               <Footer />
    </div>
  )
}

export default DashboardBody