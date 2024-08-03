import { IoNotificationsOutline } from "react-icons/io5";
//import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Topbar = () => {
  const { profile } = useSelector(state => state.auth);
   const firstname = profile ? profile.name.split(" ")[0] : ""
   
  return (
    <div className="topbar-section">
              {/* <div className="search-widget">
                        <span><CiSearch /></span>
              </div> */}
              <div className="notification-wrap">
                         <span><IoNotificationsOutline /></span>
              </div>
              <div className="profile">
                        <h3>{firstname}</h3>
                        <div className="profile-image">
                                  <img src={profile ? profile.profileImage : ""} alt="" />
                        </div>
                        <span><HiChevronDown /></span>
              </div>
    </div>
  )
}

export default Topbar