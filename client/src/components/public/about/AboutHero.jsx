import about1 from "../../../assets/about1.jpg"
import about2 from "../../../assets/about2.jpg"
import about3 from "../../../assets/about3.jpg"
const AboutHero = () => {
  return (
    <div className="about-hero">
              <div className="inner-row">
                        <div className="about-hero-content">
                                    <div className="about-hero-column">
                                              <h3>Discover Amari</h3>
                                              <h1>Africa&apos;s Gateway to Global Markets</h1>
                                    </div>
                                    <p>Welcome to Amari, an online platform revolutionizing the way African-made products reach the world. Our mission is to empower African manufacturers by providing an all-in-one e-commerce solution that effortlessly takes your business global. With Amari, you get an end-to-end drop shipping service designed to simplify your operations and amplify your success.</p>
                        </div>
                        <div className="about-hero-images">
                                   <img src={about1} alt="" />
                                   <img src={about2} alt="" />
                                   <img src={about3} alt="" />
                        </div>
              </div>
    </div>
  )
}

export default AboutHero