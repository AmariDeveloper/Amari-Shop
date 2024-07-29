import { IoNotificationsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi2";
import profile from "../../assets/profile1.jpg"
const Topbar = () => {
  return (
    <div className="topbar-section">
              <div className="search-widget">
                        <span><CiSearch /></span>
              </div>
              <div className="notification-wrap">
                         <span><IoNotificationsOutline /></span>
              </div>
              <div className="profile">
                        <h3>Zac Efron</h3>
                        <div className="profile-image">
                                  <img src={profile} alt="" />
                        </div>
                        <span><HiChevronDown /></span>
              </div>
    </div>
  )
}

export default Topbar