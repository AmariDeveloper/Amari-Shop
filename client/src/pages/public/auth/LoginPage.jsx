import loginImg from "../../../assets/login1.jpg"
import logo from "../../../assets/logo.png"
import { FcGoogle } from "react-icons/fc";
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [ status, setStatus ] = useState(false)
    const navigate = useNavigate();
  return (
    <div className="login-page-wrapper">
            <div className="login-image">
                    <img src={loginImg} alt="" />
            </div>
            <div className="login-page-body">
                       <div className="login-page-inner">
                                  <img src={logo} className="logo" alt="Amari Logo" onClick={() => navigate("/")} />

                                  <h2>Sign in to Amari</h2>
                                  
                                  <div className="sign-in-with-google">
                                               <span><FcGoogle /></span>
                                               <h4>Sign in with Google</h4>
                                  </div>

                                  <div className="switch-choice">
                                           <span></span>
                                           <p>or sign in with email</p>
                                           <span></span>
                                  </div>

                                  <div className="auth-form-content">
                                            <form>
                                                      <div className="auth-form-row">
                                                               <label htmlFor="username">Username</label>
                                                               <input type="text" className="auth-form-control" placeholder="Username or Email" />
                                                      </div>
                                                      <div className="auth-form-row">
                                                                <label htmlFor="password">Password</label>
                                                                <div className="password-input">
                                                                                <input type={status ? "text" : "password"} placeholder="Password"  />
                                                                                 <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                                          { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                                                 </div>
                                                                  </div>
                                                                  <Link className="forgot" to={"/forgot-password"}>Forgot?</Link>
                                                      </div>

                                                      <button className="form-btn">Login</button>
                                            </form>

                                            <p className="redirect">Don&apos;t have an account? <Link to={"/"}>Sign up</Link></p>
                                  </div>


                       </div>
            </div>
    </div>
  )
}

export default LoginPage