import { useState } from "react"
import Sidebar from "../../components/common/Sidebar"
import "../../styles/products.css"
import { sidebarContext } from "../../lib/sidebarcontext"

const Brands = () => {
  const [status, setStatus] = useState(false);
  return (
    <div className="dashboard-wrapper">
                 <sidebarContext.Provider value={[status, setStatus]}>
                           <Sidebar />
                          
                 </sidebarContext.Provider>
      </div>
  )
}

export default Brands