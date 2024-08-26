import { Link } from "react-router-dom"
import { CgArrowTopRight } from "react-icons/cg";
import sales from "../../../assets/sales2.jpg"
import van from "../../../assets/van.png"
import suka from "../../../assets/shuka.jpg"
import juice from "../../../assets/juice.jpg"
const HeroSection = () => {
  return (
    <div className="hero-section">
              <div className="hero-section-content">
                         <div className="hero-overlay-and-texts">
                                   <div className="hero-texts">
                                              <h1>Empowering brands to thrive online with seamless, scalable eCommerce solutions.</h1>
                                              <Link to={"/"}>Browse Shop <span><CgArrowTopRight /></span></Link>
                                   </div>
                         </div>           
              </div>

              <div className="hero-section-grid">
                       <div className="inner-row">
                                   <div className="hero-grid-wrapper">
                                                 <div className="hero-grid">
                                                             <div className="hero-grid-texts">
                                                                        <h2>Get 25% off in Black Friday Sale</h2>
                                                                        <Link to={"/"}>Explore</Link>
                                                             </div>
                                                             <img src={sales} alt="" />
                                                 </div>
                                                 <div className="hero-grid">
                                                            <div className="hero-grid-texts">
                                                                      <h2>Enjoy Free Delivery on your Total Orders above <span>Ksh.</span>8,999</h2>
                                                            </div>
                                                           <img src={van} alt="" />
                                                 </div>
                                                 <div className="hero-grid">
                                                           
                                                            <div className="hero-grid-texts">
                                                                       <h2>Get Maasai Shukas with 20% off</h2>
                                                                       <Link to={"/"}>Explore</Link>
                                                            </div>
                                                            <img src={suka} alt="" />
                                                 </div>
                                                 <div className="hero-grid">
                                                              <div className="hero-grid-texts">
                                                                      <h2>Refresh Your Day with Pure Fresh Juices. Buy One, Get One 50% off</h2>
                                                                      <Link to={"/"}>Explore</Link>
                                                              </div>
                                                              <img src={juice} alt="" />
                                                 </div>
                                   </div>
                       </div>
              </div>
    </div>
  )
}

export default HeroSection