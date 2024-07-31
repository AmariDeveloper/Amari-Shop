import { useState } from "react"
import Sidebar from "../components/common/Sidebar"
import "../styles/products.css"
import { sidebarContext } from "../lib/sidebarcontext"
import ProductsBody from "../components/products/ProductsBody"

const Products = () => {
    const [status, setStatus] = useState(false)
  return (
    <div className="dashboard-wrapper">
              <sidebarContext.Provider value={[status, setStatus]}>
                       <Sidebar />
                       <ProductsBody />
              </sidebarContext.Provider>
    </div>
  )
}

export default Products