import "../../styles/login.css"
import loginImg from "../../assets/login-cartoon.png"
import logo from "../../assets/logo.png"
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Spinner1 from "../../components/backend/common/Spinner1";
import { useLoginUserMutation } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const [ status, setStatus ] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [ loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = async(data) => {
           try {
                 const result = await loginUser(data).unwrap();

                 if(result){
                      dispatch(setCredentials({...result}));
                      navigate(`/user/${result.username === '@' ? result.id : result.username }/dashboard`)
                 }
           } catch (error) {
                 console.log(error)
                 toast.error(error.data.message, { id: 'login-error-message'})
           }

           reset();
  }
  return (
    <div className="login-wrapper">
              <Toaster />
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
                                                      <div className="logo" onClick={() => navigate("/")}>
                                                                <img src={logo} alt="logo" />
                                                      </div>
                                                      <h2>Welcome Back</h2>
                                                      <p>Please login into your account to manage the dashboard.</p>
                                             </div>
                                             <form onSubmit={handleSubmit(submitForm)}>
                                                     <div className="form-content">
                                                                <div className="login-form-row">
                                                                        <input type="email" placeholder="Email address" className="login-form-control" {...register("email", { required: "Please enter your email address"})} />
                                                                        <span className="error">{errors.email && errors.email.message}</span>
                                                               </div>
                                                              <div className="login-form-row">
                                                                       <div className="password-input">
                                                                                <input type={status ? "text" : "password"} placeholder="Password" {...register("password", { required: "Please enter your password"})}  />
                                                                                 <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                                          { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                                                 </div>
                                                                        </div>
                                                                        <span className="error">{errors.password && errors.password.message}</span>
                                                                      <Link to={'/auth/reset-password'}>Forgot your password?</Link>
                                                            </div>

                                                            <button className="form-btn" type="submit">{isLoading ? <Spinner1 /> : "Login" }</button>
                                                     </div>
                                             </form>
                                  </div>
                        </div>
              </div>
    </div>
  )
}

export default Login