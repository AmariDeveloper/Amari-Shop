import { useState } from "react"
import Sidebar from "../../../components/backend/common/Sidebar"
import "../../../styles/products.css"
import { sidebarContext } from "../../../lib/sidebarcontext"
import CategoriesBody from "../../../components/backend/products/categories/CategoriesBody"

const Categories = () => {
    const [status, setStatus] = useState(false);

  return (
    <div className="dashboard-wrapper">
            <sidebarContext.Provider value={[status, setStatus]}>
                       <Sidebar />
                       <CategoriesBody />
            </sidebarContext.Provider>
    </div>
  )
}

export default Categories