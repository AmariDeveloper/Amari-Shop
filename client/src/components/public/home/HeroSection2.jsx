import { Link } from "react-router-dom"
import { CgArrowTopRight } from "react-icons/cg";
import sales from "../../../assets/sales3.jpg"
//import van from "../../../assets/van.png"
import suka from "../../../assets/shuka.jpg"
import juice from "../../../assets/juice.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
// import required modules
import { EffectCreative, Autoplay } from 'swiper/modules';

const hero_data = [
    {
        id: 1,
        image: "one",
        statement: "Empowering African Brands to Thrive with scalable eCommerce Solutions.",
        link: "/shop",
        btnMsg: "Browse Shop"
    },
    {
        id: 2,
        image: "two",
        statement: "Empowering African Suppliers to Access Global Markets.",
        link: "/supplier/new",
        btnMsg: "Register as Supplier"
    }
]

const HeroSection2 = () => {
  return (
        <div className="hero-section">
              <div className="hero-section-content">
                         <Swiper
                               slidesPerView={1}
                               loop={true}
                               speed={1000}
                               effect={"creative"}
                               autoplay={{
                                     delay: 6500,
                                     disableOnInteraction: false
                               }}
                               creativeEffect={{
                                     prev: {
                                           shadow: true,
                                           translate: ["-20%", 0, -1]
                                     },
                                     next: {
                                            translate: ["100%", 0, 0]
                                     }
                               }}
                               modules={[ EffectCreative, Autoplay]}
                         >
                                  { hero_data.map(slide => 
                                         <SwiperSlide key={slide.id}>
                                                 { ({ isActive }) => (
                                                         <div className={`hero-slide-moja ${slide.image}`}>
                                                                    <div className={ isActive ? "hero-overlay-and-texts active" : "hero-overlay-and-texts"}>
                                                                            <div className="hero-texts">
                                                                                       <h1>{slide.statement}</h1>
                                                                                       <Link to={slide.link}>{slide.btnMsg}<span><CgArrowTopRight /></span></Link>
                                                                            </div>
                                                                  </div>   
                                                         </div>
                                                 )}
                                         </SwiperSlide>
                                  )}
                         </Swiper>        
              </div>

              <div className="hero-section-grid">
                       <div className="inner-row-2">
                                   <div className="hero-grid-wrapper">
                                                 <div className="hero-grid-2">
                                                             <div className="hero-grid-texts">
                                                                        <h2>Shop African Fashion: Discover Essentials for Every Generation.</h2>
                                                                        <Link to={"/shop/fashion"}>Explore</Link>
                                                             </div>
                                                             <img src={sales} alt="" />
                                                 </div>
                                                 {/* <div className="hero-grid">
                                                            <div className="hero-grid-texts">
                                                                      <h2>Fast, reliable, and hassle-free shipping.</h2>
                                                            </div>
                                                           <img src={van} alt="" />
                                                 </div> */}
                                                 <div className="hero-grid-2">                                             
                                                            <div className="hero-grid-texts">
                                                                       <h2>Discover African Fabrics: Vibrant Tradition Meets Modern Style.</h2>
                                                                       <Link to={"/shop/textiles"}>Explore</Link>
                                                            </div>
                                                            <img src={suka} alt="" />
                                                 </div>

                                                 <div className="hero-grid-2">
                                                              <div className="hero-grid-texts">
                                                                      <h2>From Farm to Table: Shop Nature&apos;s Best Produce.</h2>
                                                                      
                                                                      <Link to={"/shop/food-&-beverage"}>Explore</Link>
                                                              </div>
                                                              <img src={juice} alt="" />
                                                 </div>
                                   </div>
                       </div>
              </div>
    </div>
  )
}

export default HeroSection2