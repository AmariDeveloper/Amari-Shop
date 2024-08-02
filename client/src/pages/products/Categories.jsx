import { useState } from "react"
import Sidebar from "../../components/common/Sidebar"
import "../../styles/products.css"
import { sidebarContext } from "../../lib/sidebarcontext"

const Categories = () => {
    const [status, setStatus] = useState(false);

  return (
    <div className="dashboard-wrapper">
            <sidebarContext.Provider value={[status, setStatus]}>
                       <Sidebar />
                       <h3>This is the categories</h3>
            </sidebarContext.Provider>
    </div>
  )
}

export default Categories