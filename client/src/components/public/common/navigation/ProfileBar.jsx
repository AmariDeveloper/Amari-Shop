import { GoChevronDown } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutCustomerMutation } from "../../../../redux/slices/public/actionSlice";
import { setAppNotification } from "../../../../redux/slices/utilSlice";
import { clearCustomerSession } from "../../../../redux/slices/public/clientSlice";
import Spinner1 from "../../../backend/common/Spinner1";

const ProfileBar = () => {
    const [ status, setStatus ] = useState(false);
    const profileRef = useRef();
    const { session } = useSelector(state => state.client);
    const dispatch = useDispatch();

    const firstname = session && session.profile.name.split(" ")[0]
    const [ Logout, { isLoading }] = useLogoutCustomerMutation();

    const handleOutsideClick = useCallback((e)=> {
           if(profileRef.current && !profileRef.current.contains(e.target)){
                setStatus(false);
           }else{
                setStatus(true)
           }
    }, [])

    useEffect(() => {
           document.addEventListener("click", handleOutsideClick, true);
    }, [handleOutsideClick])

    const logoutCustomerClick = async() => {
            const res = await Logout().unwrap();
            if(res){
                  dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                  dispatch(clearCustomerSession());
            }
    }
  return (
    <div ref={profileRef} className="profile-bar">
             <div className="profile-wrap-box" onClick={() => setStatus(true)}>
                       <img src={session && session.profile.profileImage} alt="" />
                       <h3>{firstname} <span><GoChevronDown /></span></h3>
             </div>
             <div className={ status ? "profile-popup active" : "profile-popup"}>
                       <div className="profile-pop-header">
                                  <h4>{session && session.profile.name}</h4>
                                  <p>{session && session.profile.email}</p>
                       </div>
                        <ul>
                                <li><Link to={`/${firstname.toLowerCase()}/my-account`}><span><HiOutlineUserCircle /></span>Account</Link></li>
                                <li><Link to={"/"}><span><HiOutlineHeart /></span>Wishlist</Link></li>
                                <li><Link to={"/"}><span><IoHelpBuoyOutline /></span>Help & Support</Link></li>
                        </ul>
                        <button onClick={logoutCustomerClick}>{isLoading ? <Spinner1 /> : "Logout"}</button>
             </div>
    </div>
  )
}

export default ProfileBar