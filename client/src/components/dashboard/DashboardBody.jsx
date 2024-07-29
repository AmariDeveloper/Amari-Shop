import Topbar from "../common/Topbar"
import ExtraInfo from "./ExtraInfo"
import ShopAnalytics from "./ShopAnalytics"
import SummaryStrip from "./SummaryStrip"

const DashboardBody = () => {
  return (
    <div className="dashboard-body">
              <div className="top-wrapper">
                         <div className="top-texts">
                                  <h2>Welcome Back, Efron</h2>
                                  <p>Here&apos;s what&apos;s happening with your store today</p>
                         </div>
                         <Topbar />
              </div>

               <SummaryStrip />
               <div className="dashboard-split">
                          <ShopAnalytics />
                          <ExtraInfo />
               </div>
    </div>
  )
}

export default DashboardBody