import { useState } from "react"
import Sidebar from "../components/common/Sidebar"
import DashboardBody from "../components/dashboard/DashboardBody"
import "../styles/dashboard.css"
import { sidebarContext } from "../lib/sidebarcontext"

const Dashboard = () => {
    const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
             <sidebarContext.Provider value={[status,setStatus]}>
                       <Sidebar />
                      <DashboardBody />
             </sidebarContext.Provider>
    </div>
  )
}

export default Dashboard