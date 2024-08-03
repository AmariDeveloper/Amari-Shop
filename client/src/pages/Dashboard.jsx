import { useEffect, useState } from "react"
import Sidebar from "../components/common/Sidebar"
import DashboardBody from "../components/dashboard/DashboardBody"
import "../styles/dashboard.css"
import { sidebarContext } from "../lib/sidebarcontext"
import { useGetUserProfileQuery } from "../redux/slices/userSlice"
import { useDispatch } from "react-redux"
import { setUserProfile } from "../redux/slices/authSlice"

const Dashboard = () => {
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch();
    const { data } = useGetUserProfileQuery({ refetchOnMountOrArgChange: true })

    useEffect(() => {
           if(data){
                dispatch(setUserProfile({...data.user}))
           }
    }, [dispatch,data])


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