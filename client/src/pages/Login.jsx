import "../styles/login.css"
import loginImg from "../assets/login-cartoon.png"
import logo from "../assets/logo.png"
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [ status, setStatus ] = useState(false)
  return (
    <div className="login-wrapper">
              <div className="inner-row">
                        <div className="login-content">
                                  <div className="login-left-col">
                                           <div className="login-left-inner">
                                                      <h2>Everything in One Place, Simplified Dashboard.</h2>
                                                      <p>Simplify your e-commerce management with the user-friendly admin dashboard</p>
                                                      <img src={loginImg} alt="login-cartoon" />
                                           </div>
                                  </div>
                                  <div className="login-form-col">
                                             <div className="login-intro">
                                                      <div className="logo">
                                                                <img src={logo} alt="logo" />
                                                      </div>
                                                      <h2>Welcome Back</h2>
                                                      <p>Please login into your account to manage the dashboard.</p>
                                             </div>
                                             <form>
                                                     <div className="form-content">
                                                                <div className="login-form-row">
                                                                        <input type="email" placeholder="Email address" className="login-form-control" />
                                                               </div>
                                                              <div className="login-form-row">
                                                                       <div className="password-input">
                                                                                <input type="password" placeholder="Password"  />
                                                                                 <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                                          { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                                                 </div>
                                                                        </div>
                                                                      <Link to={'/auth/reset-password'}>Forgot your password?</Link>
                                                            </div>

                                                            <button className="form-btn" type="submit">Login</button>
                                                     </div>
                                             </form>
                                  </div>
                        </div>
              </div>
    </div>
  )
}

export default Login