import { Link } from "react-router-dom"
import action from "../../../assets/registration.jpg"
import { RxArrowTopRight } from "react-icons/rx";
const AboutAction = () => {
  return (
    <div className="about-action">
               <div className="inner-row">
                           <div className="about-action-content">
                                        <img src={action} alt="" />

                                        <div className="about-action-texts">
                                                  <h3>Join the Movement</h3>
                                                  <h2>Your Global Success Starts Here</h2>
                                                  <p>Partner with Amari today and let us help you bring your authentic African products to customers everywhere. Together, we&apos;ll tell the story of Africa through quality craftmanship, creativity and innovation.</p>
                                                  <Link to={"/supplier/new"}>Get Started <span><RxArrowTopRight /></span></Link>
                                        </div>
                           </div>
               </div>
    </div>
  )
}

export default AboutAction