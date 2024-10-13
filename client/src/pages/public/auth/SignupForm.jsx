/* eslint-disable react/prop-types */
import { useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterNewCustomerManuallyMutation } from "../../../redux/slices/public/actionSlice";
import { setAppNotification } from "../../../redux/slices/utilSlice";
import Spinner1 from "../../../components/backend/common/Spinner1";
import { clearRedirect } from "../../../redux/slices/public/clientSlice";

const SignupForm = ({ func}) => {
  const [ status, setStatus ] = useState(false);
  const { redirect } = useSelector(state => state.client);
  const [ confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors}, watch} = useForm();
  const [ registerCustomer, { isLoading }] = useRegisterNewCustomerManuallyMutation();

  const submitRegistrationForm = async(data) => {
             try {
                   const res = await registerCustomer(data).unwrap();

                   if(res){
                       //  console.log(res)
                         if(res.error){
                              dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
                         }else{
                              dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                              navigate(`${redirect}`)

                              setTimeout(() => {
                                     dispatch(clearRedirect())
                              }, 5000)
                         }
                   }
             } catch (error) {
                     //console.log(error)
                     dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
             }
  }
  return (
    <div className="auth-form-content">
              <div className="auth-header" onClick={() =>func(false)}>
                         <span><PiCaretLeftBold /></span>
                         <h2>Sign up to Amari</h2>
              </div>
              { isLoading && <div className="loading-screen"></div> }
              <form className="adjust" onSubmit={handleSubmit(submitRegistrationForm)}>
                        <div className="auth-form-row split">
                                     <div className="auth-form-column">
                                               <label htmlFor="Firstname">Firstname</label>
                                               <input type="text" className="auth-form-control" {...register("firstname", { required: "Your firstname is required"})} />
                                               <span className="error">{errors.firstname && errors.firstname.message}</span>
                                     </div>
                                     <div className="auth-form-column">
                                               <label htmlFor="Lastname">Lastname</label>
                                               <input type="text" className="auth-form-control" {...register("lastname", { required: "Your lastname is required"})} />
                                               <span className="error">{errors.lastname && errors.lastname.message}</span>
                                     </div>
                        </div>
                        <div className="auth-form-row">
                                   <label htmlFor="email">Email Address</label>
                                   <input type="email" className="auth-form-control" {...register("email", { required: "Your email is required"})} />
                                   <span className="error">{errors.email && errors.email.message}</span>
                        </div>
                        <div className="auth-form-row split">
                                    <div className="auth-form-column">
                                             <label htmlFor="Password">Password</label>
                                             <div className="password-input">
                                                         <input type={status ? "text" : "password"} {...register("password", { required: "Enter a valid password", minLength: 8})} />
                                                             <div className="toggle-btn" onClick={() => setStatus(!status)}>
                                                                     { status ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                             </div>
                                              </div>
                                             <span className="error">{errors.password && errors.password.message}</span>
                                   </div>
                                   <div className="auth-form-column">
                                              <label htmlFor="Password">Confirm Password</label>
                                              <div className="password-input">
                                                          <input type={confirm ? "text" : "password"} {...register("confirmPassword", {
                                                                  required: true,
                                                                  minLength: 8,
                                                                  validate: (val) => {
                                                                         if(watch("password") !== val){
                                                                               return "Your passwords should match!"
                                                                         }
                                                                  }
                                                          })}  />
                                                              <div className="toggle-btn" onClick={() => setConfirm(!confirm)}>
                                                                      { confirm ? <span><VscEyeClosed /></span> : <span><VscEye /></span>}
                                                              </div>
                                              </div>
                                           <span className="error">{errors.confirmPassword && errors.confirmPassword.message}</span>
                                   </div>
                        </div>

                        <div className="terms-acceptance">
                                   <div className="terms-column">
                                              <input type="checkbox" className="auth-checkbox" {...register("terms_confirmation", { required: "You must agree to Amari's terms and policies"})} />
                                              <p className="terms">I agree with Amari&apos;s<Link to={"/"}>Terms of Service,</Link> <Link to={"/"}>Privacy Policy,</Link> and our default <Link to={"/"}>Notification Settings.</Link></p>
                                   </div>

                                   <span className="error">{errors.terms_confirmation && errors.terms_confirmation.message}</span>
                        </div>
                        <button className="form-btn mb">{ isLoading ? <Spinner1 /> : "Create Account"}</button>
              </form>
    </div>
  )
}

export default SignupForm