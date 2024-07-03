import Sidebar from "../../components/common/Sidebar"
import DashboardBody from "../../components/dashboard/DashboardBody"
import "../../styles/dashboard.css"

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
           <Sidebar />
           <DashboardBody />
    </div>
  )
}

export default DashboardPage