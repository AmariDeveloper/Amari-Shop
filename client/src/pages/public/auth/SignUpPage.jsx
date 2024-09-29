import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import signupImg from "../../../assets/signup.jpg"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import SignupForm from "./SignupForm";


const SignUpPage = () => {
  const navigate = useNavigate();
  const [ choice, switchChoice ] = useState(false);
  return (
    <div className="auth-page-wrapper">
              <div className="auth-image">
                      <img src={signupImg} alt="" />
              </div>
              <div className="auth-page-body">
                        <div className="auth-page-inner">
                                   <img src={logo} className="logo" alt="Amari Logo" onClick={() => navigate("/")} />
                                  { choice ?
                                         <SignupForm status={choice} func={switchChoice} />
                                         :
                                         <>
                                                  <h2>Sign up to Amari</h2>
                                                <div className="sign-in-with-google active">
                                                      <span><FcGoogle /></span>
                                                      <h4>Sign up with Google</h4>
                                               </div>

                                              <div className="switch-choice active">
                                                       <span></span>
                                                       <p>or</p>
                                                       <span></span>
                                              </div>

                                              <div className="sign-in-with-google" onClick={() => switchChoice(true)}>
                                                           <h4>Continue with email</h4>
                                              </div>

                                              <div className="terms-wrap">
                                                         <p className="terms">By creating an account you agree with our <Link to={"/"}>Terms of Service,</Link> <Link to={"/"}>Privacy Policy,</Link> and our default <Link to={"/"}>Notification Settings.</Link></p>
                                              </div>
                                         </>
                                         }
                                  <p className="redirect">Already have an account? <Link to={"/session/new"}>Sign in</Link></p>
                        </div>
              </div>
    </div>
  )
}

export default SignUpPage