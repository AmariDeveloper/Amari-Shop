import { useState } from "react"
import Sidebar from "../components/common/Sidebar"
import "../styles/settings.css"
import { sidebarContext } from "../lib/sidebarcontext"
import SettingsBody from "../components/settings/SettingsBody"

const Settings = () => {
    const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
            <sidebarContext.Provider value={[status, setStatus]}>
                      <Sidebar />
                      <SettingsBody />
            </sidebarContext.Provider>
    </div>
  )
}

export default Settings