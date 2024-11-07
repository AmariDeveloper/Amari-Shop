import Footer from "../../../components/public/common/Footer"
import Navbar from "../../../components/public/common/navigation/Navbar"
import { countryList, productTypes } from "../../../data/utils"
import { Link, useNavigate  } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useRegisterNewBusinessMutation } from "../../../redux/slices/public/actionSlice"
import { useDispatch } from "react-redux"
import { setAppNotification } from "../../../redux/slices/utilSlice"
import { useState } from "react"
import congrats from "../../../assets/well_done.svg"
import AppNotification from "../../../components/backend/common/AppNotification"
import Spinner1 from "../../../components/backend/common/Spinner1"

const RegisterSupplier = () => {
  const { register, handleSubmit, formState: { errors}, reset} = useForm();
 const dispatch = useDispatch();
 const [ successStatus, setSuccessStatus ] = useState(false)
 const navigate = useNavigate();

  const [ RegisterBusiness, { isLoading} ] = useRegisterNewBusinessMutation();
  const SubmitSupplierDetails = async(data) =>{
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        formData.append("business_cert", data.business_cert[0]);

        try {
              const res = await RegisterBusiness(formData).unwrap();

              if(res.error){
                     dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
              }else{
                     setSuccessStatus(true);
                     reset();
                     window.scrollTo(0,0);
                     dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))

                     setTimeout(() =>{
                            navigate("/");
                            setSuccessStatus(false)
                    }, 300000)
              }
        } catch (error) {
              dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
        }
  }



  return (
    <>
              <Navbar />
              <div className="registration-body">
                        <div className="inner-row">
                                     { successStatus ?
                                            <div className="success-wrapper">
                                                         <img src={congrats} alt="" />

                                                         <h2>Success! Thank you for Registering to Amari.</h2>
                                                         <p>Kindly check on your email on the next steps. Our team is here to support you every step of the way. If you have any questions, feel free to reach out to us at support@amari.africa.</p>

                                                         <Link to={"/"} onClick={() => setSuccessStatus(false)}>Back Home</Link>
                                            </div>
                                            :
                                            <>
                                                    <div className="registration-intro">
                                                              <h1>Sign up to Showcase your Products with Amari.</h1>
                                                              <p>Fill out the form below to start your journey with Amari and reach customers around the world.</p>
                                                  </div>
                                                  { isLoading && <div className="loading-screen"></div> }
                                     <form onSubmit={handleSubmit(SubmitSupplierDetails)}>
                                            <div className="form-content">
                                                       <h3>Business Information</h3>
                                                       <div className="form-row split">
                                                                  <div className="form-row-column">
                                                                               <label htmlFor="business Name">Business Name <span>*</span></label>
                                                                               <input type="text" {...register("business_name", { required: "This input is required"})} className="input-control" />
                                                                               <span className="error">{errors.business_name && errors.business_name.message}</span>
                                                                  </div>
                                                                  <div className="form-row">
                                                                             <label htmlFor="contact name">Full name of Contact Person <span>*</span></label>
                                                                             <input type="text" {...register("fullname", { required: "This input is required"})} className="input-control"  />
                                                                             <span className="error">{errors.fullname && errors.fullname.message}</span>
                                                                  </div>
                                                       </div>
                                                       <div className="form-row split">
                                                               <div className="form-row-column">
                                                                         <label htmlFor="contact email">Email Address <span>*</span></label>
                                                                         <input type="email" className="input-control" {...register("email", { required: "This input is required"})}  />
                                                                         <span className="error">{errors.email && errors.email.message}</span>
                                                               </div>
                                                               <div className="form-row-column">
                                                                         <label htmlFor="phone">Contact Phone number <span>*</span></label>
                                                                         <input type="number" className="input-control" pattern="+[0,9]" {...register("phone", { required: "This input is required"})} />
                                                                         <span className="error">{errors.phone && errors.phone.message}</span>
                                                               </div>
                                                       </div>
                                                       <div className="form-row split">
                                                                 <div className="form-row-column">
                                                                              <label htmlFor="country">Country <span>*</span></label>
                                                                              <select className="input-control" {...register("country", { required: "This input is required"})}>
                                                                                        <option value="">Select Country</option>
                                                                                        { countryList.map(country => 
                                                                                               <option value={country} key={country}>{country}</option>
                                                                                        )}
                                                                              </select>
                                                                              <span className="error">{errors.country && errors.country.message}</span>
                                                                 </div>
                                                                 <div className="form-row-column">
                                                                          <label htmlFor="address">Business Address <span>*</span></label>
                                                                          <input type="text" className="input-control" {...register("address", { required: "This input is required"})} />
                                                                          <span className="error">{errors.address && errors.address.message}</span>
                                                                 </div>
                                                       </div>


                                                       <h3>Product Information</h3>
                                                       <div className="form-row">
                                                                 <label htmlFor="product category">Type of Product(s) Category <span>*</span></label>
                                                                 <div className="checkboxes-wrapper">
                                                                            { productTypes.slice(0, productTypes.length - 1).map(type => 
                                                                                   <div className="product-type" key={type}>
                                                                                              <input {...register("product_types", {required: "This input is required"})} type="checkbox" value={type} className="checkbox-control" />
                                                                                              <h4>{type}</h4>
                                                                                   </div>
                                                                            )}
                                                                 </div>
                                                                 <span className="error">{errors.product_types && errors.product_types.message}</span>
                                                       </div>
                                                       <div className="form-row">
                                                                 <label htmlFor="other category">If other please specify</label>
                                                                 <input type="text" className="input-control" {...register("other_category")} />
                                                       </div>
                                                       <div className="form-row">
                                                                  <label htmlFor="Brief description">Brief description of your Products <span>*</span></label>
                                                                  <textarea className="text-control" {...register("product_description", { required: "This input is required"})}></textarea>
                                                                  <span className="error">{errors.product_description && errors.product_description.message}</span>
                                                       </div>

                                                       <h3>Business Information</h3>
                                                       <div className="form-row">
                                                                   <label htmlFor="business certificate">Upload your Business Registration Certificate <span>*</span></label>
                                                                   <input type="file" className="file-control" {...register("business_cert", { required: "This input is required"})} />
                                                                   <span className="error">{errors.business_cert && errors.business_cert.message}</span>
                                                       </div>

                                                       <h3>Service Plan</h3>
                                                       <div className="form-row">
                                                                  <label htmlFor="subcription">Subscription Plan <span>*</span></label>
                                                                  <select className="input-control" {...register("service_plan", { required: "This input is required"})}>
                                                                          <option value="">Select service plan</option>
                                                                          <option value="Professional">Professional</option>
                                                                  </select> 
                                                       </div>

                                                       <h3>Addition Information</h3>
                                                       <div className="form-row split">
                                                                <div className="form-row-column">
                                                                         <label htmlFor="how did you hear about us">How did you hear about us? <span>*</span></label>
                                                                         <select className="input-control" {...register("source", { required: "This input is required"})}>
                                                                                    <option value="">Select option</option>
                                                                                    <option value="Google Search">Google Search</option>
                                                                                    <option value="Social Media">Social Media</option>
                                                                                    <option value="Referral">Referral</option>
                                                                                    <option value="Other">Other</option>
                                                                         </select>
                                                                         <span className="error">{errors.source && errors.source.message}</span>
                                                                </div>
                                                                <div className="form-row-column">
                                                                           <label htmlFor="website ">Website Link</label>
                                                                           <input type="text" className="input-control" {...register("website")} />
                                                                </div>
                                                       </div>
                                                       <div className="form-row split">
                                                                <div className="form-row-column">
                                                                            <label htmlFor="facebook">Facebook Link</label>
                                                                            <input type="text" className="input-control" {...register("facebook")} />
                                                                </div>
                                                                  <div className="form-row-column">
                                                                              <label htmlFor="twitter">X Link</label>
                                                                              <input type="text" className="input-control" {...register("x")} />
                                                                  </div>
                                                       </div>
                                                       <div className="form-row split">
                                                                  <div className="form-row-column">
                                                                            <label htmlFor="insta">Instagram Link</label>
                                                                            <input type="text" className="input-control" {...register("instagram")} />
                                                                  </div>
                                                                  <div className="form-row-column">
                                                                            <label htmlFor="linkedin">LinkedIn Link</label>
                                                                            <input type="text" className="input-control" {...register("linkedin")} />
                                                                  </div>
                                                       </div>

                                                       <div className="terms-supplier-wrap">
                                                                   <p>By creating an account you agree with our <Link to={"/"}>Terms of Service,</Link> <Link to={"/"}>Privacy Policy,</Link> and our default <Link to={"/"}>Notification Settings.</Link></p>
                                                        </div>         

                                                        <button className="form-btn mt">{isLoading ? <Spinner1 /> : "Submit" }</button>  
                                            </div>
                                     </form>
                                            </>
                                      }


                        </div>
              </div>
              <AppNotification />
              <Footer />
    </>
  )
}

export default RegisterSupplier