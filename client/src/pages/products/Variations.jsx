import { useState } from "react"
import { sidebarContext } from "../../lib/sidebarcontext"
import Sidebar from "../../components/common/Sidebar"
import VariationsBody from "../../components/products/variations/VariationsBody"

const Variations = () => {
    const [status, setStatus ] = useState(false)
  return (
    <sidebarContext.Provider  value={[status, setStatus]}>
                <Sidebar />
                <VariationsBody />
    </sidebarContext.Provider>
  )
}

export default Variations