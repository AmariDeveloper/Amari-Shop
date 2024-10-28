import { useState } from "react"
import { publicSidebarContext } from "./publicnavcontext"
import Header from "./Header"
import Sidebar from "./Sidebar"
const Navbar = () => {
    const [status, setStatus] = useState(false)
  return (
    <publicSidebarContext.Provider value={[status, setStatus]}>
            <Header />
            <Sidebar />
    </publicSidebarContext.Provider>
  )
}

export default Navbar