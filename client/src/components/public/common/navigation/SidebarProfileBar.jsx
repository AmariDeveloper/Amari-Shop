/* eslint-disable react/prop-types */
import { useState } from "react"
import { GoChevronRight,GoArrowLeft } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { useLogoutCustomerMutation } from "../../../../redux/slices/public/actionSlice";
import Spinner1 from "../../../backend/common/Spinner1";
import { setAppNotification } from "../../../../redux/slices/utilSlice";
import { clearCustomerSession } from "../../../../redux/slices/public/clientSlice";

const SidebarProfileBar = ({ func }) => {
    const [profileStatus, setProfileStatus] = useState(false)
    const { session } = useSelector(state => state.client)
    const firstname = session.profile ?  session.profile.name.split(" ")[0] : ""
    const [ Logout, { isLoading } ] = useLogoutCustomerMutation();
    const dispatch = useDispatch();

    const openProfileBar = () => {
           setProfileStatus(true)
           func("My Account")
    }

    const closeProfileBar = () => {
           setProfileStatus(false);
           func("Menu")
    }

    const logoutCustomerClick = async() => {
         const res = await Logout().unwrap();
         if(res){
                dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}));
                dispatch(clearCustomerSession())
         }
    }
  return (
    <div className="sidebar-profile-bar">
               <div className="profile-wrap-box" onClick={openProfileBar}>
                         <img src={session && session.profile.profileImage} alt="" />
                         <h3>{firstname} <span><GoChevronRight /></span></h3>
               </div>

               <div className={ profileStatus ? "sidebar-profile-wrap active" : "sidebar-profile-wrap"}>
                         <h3> <span onClick={closeProfileBar}><GoArrowLeft /></span>Profile</h3>

                         <div className="account-details">
                                      <div className="profile-picture">
                                              <img src={session && session.profile.profileImage} alt="" />
                                      </div>
                                    <div className="profile-pop-header">
                                              <h4>{session && session.profile.name}</h4>
                                              <p>{session && session.profile.email}</p>
                                    </div>
                         </div>
                         <ul>
                                <li><Link to={`/${firstname.toLowerCase()}/my-account`}><span><HiOutlineUserCircle /></span>Account</Link></li>
                                <li><Link to={"/"}><span><HiOutlineHeart /></span>Wishlist</Link></li>
                                <li><Link to={"/"}><span><IoHelpBuoyOutline /></span>Help & Support</Link></li>
                        </ul>

                        <button onClick={logoutCustomerClick}>{ isLoading ? <Spinner1 /> : "Logout"}</button>
               </div>
    </div>
  )
}

export default SidebarProfileBar