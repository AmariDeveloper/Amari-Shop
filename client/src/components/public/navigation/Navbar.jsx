import { useState } from "react"
import { publicSidebarContext } from "./publicnavcontext"
import Header from "./Header"
const Navbar = () => {
    const [status, setStatus] = useState(false)
  return (
    <publicSidebarContext.Provider value={[status, setStatus]}>
            <Header />
    </publicSidebarContext.Provider>
  )
}

export default Navbar