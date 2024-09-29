/* eslint-disable react/prop-types */
import { useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
const SignupForm = ({ func}) => {
  const [ status, setStatus ] = useState(false);
  const [ confirm, setConfirm] = useState(false);
  return (
    <div className="auth-form-content">
              <div className="auth-header" onClick={() =>func(false)}>
                         <span><PiCaretLeftBold /></span>
                         <h2>Sign up to Amari</h2>
              </div>
              <form className="adjust">
                        <div className="auth-form-row split">
                                     <div className="auth-form-column">
                                               <label htmlFor="Firstname">Firstname</label>
                                               <input type="text" className="auth-form-control" />
                                     </div>
                                     <div className="auth-form-column">
                                               <label htmlFor="Lastname">Lastname</label>
                                               <input type="text" className="auth-form-control" />
                                     </div>
                        </div>
                        <div className="auth-form-row">
                                   <label htmlFor="email">Email Address</label>
                                   <input type="email" className="auth-form-control"/>
                        </div>
                        <div className="auth-form-row split">
                                    <div className="auth-form-column">
                                             <label htmlFor="Password">Password</label>
                                             <div className="password-input">
                                                         <input type={status ? "text" : "password"}  />
                                                             <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                     { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                             </div>
                                              </div>
                                   </div>
                                   <div className="auth-form-column">
                                              <label htmlFor="Password">Confirm Password</label>
                                              <div className="password-input">
                                                          <input type={confirm ? "text" : "password"}  />
                                                              <div className="toggle-btn" onClick={() => setConfirm(!confirm)}>
                                                                      { confirm ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                              </div>
                                               </div>
                                   </div>
                        </div>

                        <div className="terms-acceptance">
                                   <input type="checkbox" className="auth-checkbox" />
                                   <p className="terms">I agree with Amari&apos;s<Link to={"/"}>Terms of Service,</Link> <Link to={"/"}>Privacy Policy,</Link> and our default <Link to={"/"}>Notification Settings.</Link></p>
                        </div>

                        <button className="form-btn mb">Create Account</button>
              </form>
    </div>
  )
}

export default SignupForm