import { useContext } from "react"
import { HiOutlineMenu } from "react-icons/hi";
import { sidebarContext } from "../../lib/sidebarcontext";
import Topbar from "../common/Topbar";
import { IoCloudUploadOutline } from "react-icons/io5";
import profileImg from "../../assets/dummy.jpg"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import { useUpdateUserProfileMutation } from "../../redux/slices/userSlice";
import { setUserProfile, updateUsername } from "../../redux/slices/authSlice";
import Spinner1 from "../common/Spinner1";
import AppNotification from "../common/AppNotification";
import { setAppNotification } from "../../redux/slices/utilSlice";

const SettingsBody = () => {
      // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
  const [ userImage, setUserImage ] = useState([])
  const [ imageUrl, setImageUrl] = useState([]);
  const [ status, setStatus] = useState(false)
  const { profile } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const { register, handleSubmit } = useForm({
              defaultValues: {
                     firstname: profile ? profile.name.split(" ")[0] : "",
                     lastname: profile ? profile.name.split(" ")[1] : "",
                     email: profile.email ? profile.email : "",
                    username: profile.username ? profile.username : "",
                    phone: profile.phone ? profile.phone : "",
                    country: profile.country ? profile.country : "",
                    bio: profile.bio ? profile.bio : ""
              }
  })

  //upload profile image
  const uploadProfileImage = (e) => {
    setUserImage([...e.target.files]); 
}

//remove current/uploaded image
const clearImageProfile = () => {
    setImageUrl([]);
    setUserImage([]);
    setStatus(false)
}

useEffect(() => {
    if(userImage.length < 1) return;

    const profileUrl = [];
    userImage.forEach(kitu => {
            profileUrl.push(URL.createObjectURL(kitu))
            setStatus(true)
    });
    setImageUrl(profileUrl)

}, [userImage])

const [ updateProfileAction, { isLoading }] = useUpdateUserProfileMutation();

const updateUserProfile = async (data) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("profileImage", data.profileImage[0]);

      try {
           const res = await updateProfileAction(formData);
           if(res.error){
                 dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
           }else{
                 dispatch(setUserProfile({...res.data.info}));
                 dispatch(updateUsername(res.data.info.username ));
                 dispatch(setAppNotification({status: true, message: res.data.message, type: "Success"}))
           }
      } catch (error) {
            console.log(error)
      }
}

const fireNotification = ()=>{

}
  return (
    <div className="dashboard-body">
                <AppNotification />
                <div className="top-wrapper">
                         <div className="top-texts">
                                   <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                                   </span>
                         </div>
                         <Topbar />
              </div>
              
              <form onSubmit={handleSubmit(updateUserProfile)}>
                         <div className="settings-header">
                                     <div className="settings-header-texts">
                                              <h3>Account Settings</h3>
                                              <p>Update your photo and personal details here.</p>
                                     </div>
                                     <div className="settings-action">
                                               <p className="cancel-btn" onClick={fireNotification}>Cancel</p>
                                               <button type="submit">{ isLoading ? <Spinner1 /> : "Save"}</button>
                                     </div>
                         </div>
                         <div className="settings-form">
                                     <div className="details-side">
                                               <h4>Personal Information</h4>
                                               <div className="form-row">
                                                        <label htmlFor="fullname">Full Name</label>
                                                        <div className="column-row">
                                                                    <input type="text" placeholder="Enter first name" {...register("firstname")} className="input-control" />
                                                                    <input type="text" placeholder="Enter last name" {...register("lastname")} className="input-control" />
                                                        </div>
                                               </div>
                                               <div className="form-row">
                                                        <label htmlFor="email">Email Address</label>
                                                        <input type="email" className="input-control" {...register("email")} placeholder="Enter email address" />
                                               </div>
                                               <div className="form-row">
                                                            <label htmlFor="username">Username</label>
                                                         <div className="username-input">
                                                                    <p>https:/amari.shop/@</p>
                                                                    <input type="text" {...register("username")}  className="input-control" placeholder="Enter your username" />
                                                         </div>
                                               </div>
                                               <div className="form-row split">
                                                         <div className="form-column">
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="number" {...register("phone")}  placeholder="Enter your phone" className="input-control" pattern="+[0,9]" />
                                                         </div>
                                                         <div className="form-column">
                                                                    <label htmlFor="country">Country of Residence</label>
                                                                    <input type="text" {...register("country")} placeholder="Enter your country" className="input-control"/>
                                                         </div>
                                               </div>
                                               <div className="form-row">
                                                         <label htmlFor="bio">Bio <span>(Write a short introduction)</span></label>
                                                         <textarea className="textarea-control" {...register("bio")} placeholder="Hello planet. I'm so and so and I stand for 1 2 and 3"></textarea>
                                               </div>
                                     </div>
                                     <div className="photo-side">
                                                 <h4>Your Photo</h4>
                                                 <div className="photo-display">
                                                         <div className="profile-image">
                                                                 { status ? <img src={imageUrl} alt="" /> : <img src={profile.profileImage} alt="" />}
                                                                  <img src={profileImg} alt="" />
                                                         </div>
                                                         <div className="photo-actions">
                                                                  <h3>Edit your photo</h3>
                                                                   <p onClick={clearImageProfile}>Remove</p>
                                                         </div>
                                                 </div>
                                                 <div className="photo-upload">
                                                               <input type="file" {...register("profileImage")} onChange={uploadProfileImage} />
                                                              <span className="icon"><IoCloudUploadOutline /></span>
                                                              <p><span>Click </span>to upload your image</p>
                                                 </div>
                                     </div>
                         </div>
              </form>
    </div>
  )
}

export default SettingsBody