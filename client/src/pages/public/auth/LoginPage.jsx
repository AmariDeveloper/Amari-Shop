import loginImg from "../../../assets/login1.jpg"
import logo from "../../../assets/logo.png"
import { FcGoogle } from "react-icons/fc";
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginCustomerManuallyMutation } from "../../../redux/slices/public/actionSlice";
import { useForm } from "react-hook-form";
import { setAppNotification } from "../../../redux/slices/utilSlice";
import Spinner1 from "../../../components/backend/common/Spinner1";
import { clearRedirect, setCustomerSession } from "../../../redux/slices/public/clientSlice";
import AppNotification from "../../../components/backend/common/AppNotification";

const LoginPage = () => {
    const [ status, setStatus ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { redirect } = useSelector(state => state.client);
    const { register, handleSubmit, formState: { errors}, reset } = useForm();

    const [ LoginCustomer, { isLoading }] = useLoginCustomerManuallyMutation();

    const submitLoginForm = async(data) => {
           try {
                const res = await LoginCustomer(data).unwrap();

                if(res){
                       if(res.error){
                            dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
                       }else{
                             dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}));
                             navigate(`${redirect}`);
                             reset();
                           
                             //set customer session
                             dispatch(setCustomerSession(res.info));
                             

                             setTimeout(() => { dispatch(clearRedirect())}, 5000)
                       }
                }
           } catch (error) {
                   dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
           }
    }
  return (
    <div className="auth-page-wrapper">
            <div className="auth-image">
                    <img src={loginImg} alt="" />
            </div>
            { isLoading && <div className="loading-screen"></div> }
            <div className="auth-page-body">
                       <div className="auth-page-inner">
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
                                            <form onSubmit={handleSubmit(submitLoginForm)}>
                                                      <div className="auth-form-row">
                                                               <label htmlFor="username">Username</label>
                                                               <input type="text" {...register("email", { required: "This input is required"})} className="auth-form-control" placeholder="Username or Email" />
                                                               <span className="error">{errors.email && errors.email.message}</span>
                                                      </div>
                                                      <div className="auth-form-row">
                                                                <label htmlFor="password">Password</label>
                                                                <div className="password-input">
                                                                                <input type={status ? "text" : "password"} {...register("password", { required: "This input is required."})} placeholder="Password"  />
                                                                                 <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                                          { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                                                 </div>
                                                                  </div>
                                                                  <span className="error">{errors.password && errors.password.message}</span>
                                                                  <Link className="forgot" to={"/forgot-password"}>Forgot?</Link>
                                                      </div>

                                                      <button className="form-btn">{isLoading ? <Spinner1 /> : "Login"}</button>
                                            </form>

                                            <p className="redirect">Don&apos;t have an account? <Link to={"/signup/new"}>Sign up</Link></p>
                                  </div>

                             <AppNotification />
                       </div>
            </div>
    </div>
  )
}

export default LoginPage