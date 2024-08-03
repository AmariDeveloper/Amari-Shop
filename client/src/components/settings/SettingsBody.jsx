import { useContext } from "react"
import { HiOutlineMenu } from "react-icons/hi";
import { sidebarContext } from "../../lib/sidebarcontext";
import Topbar from "../common/Topbar";


const SettingsBody = () => {
      // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus ] = useContext(sidebarContext);
  return (
    <div className="dashboard-body">
                <div className="top-wrapper">
                         <div className="top-texts">
                                   <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                                   </span>
                         </div>
                         <Topbar />
              </div>
              
              <form>
                         <div className="settings-header">
                                     <div className="settings-header-texts">
                                              <h3>Account Settings</h3>
                                              <p>Update your photo and personal details here.</p>
                                     </div>
                                     <div className="settings-action">
                                               <button>Cancel</button>
                                               <button type="submit">Save</button>
                                     </div>
                         </div>
                         <div className="settings-form">
                                     <div className="details-side">
                                               <h4>Personal Information</h4>
                                               <div className="form-row">
                                                        <label htmlFor="fullname">Full Name</label>
                                                        <div className="column-row">
                                                                    <input type="text" placeholder="Enter first name" className="input-control" />
                                                                    <input type="text" placeholder="Enter last name" className="input-control" />
                                                        </div>
                                               </div>
                                               <div className="form-row">
                                                        <label htmlFor="email">Email Address</label>
                                                        <input type="email" className="input-control" placeholder="Enter email address" />
                                               </div>
                                               <div className="form-row">
                                                            <label htmlFor="username">Username</label>
                                                         <div className="username-input">
                                                                    <p>amari.shop/</p>
                                                                    <input type="text" className="input-control" placeholder="Enter username" />
                                                         </div>
                                               </div>
                                               <div className="form-row">
                                                         <div className="form-column">
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="number" placeholder="Enter your phone" className="input-control" pattern="+[0,9]" />
                                                         </div>
                                                         <div className="form-column">
                                                                    <label htmlFor="country">Country of Residence</label>
                                                                    <input type="text" placeholder="Enter your country" className="input-control"/>
                                                         </div>
                                               </div>
                                               <div className="form">
                                                         <label htmlFor="bio">Bio <span>(Write a short introduction)</span></label>
                                                         <textarea className="textarea-control" placeholder="Hello planet. I'm so and so and I stand for 1 2 and 3"></textarea>
                                               </div>
                                     </div>
                                     <div className="photo-side"></div>
                         </div>
              </form>
    </div>
  )
}

export default SettingsBody