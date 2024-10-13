import AppNotification from "../../components/backend/common/AppNotification"
import AboutAction from "../../components/public/about/AboutAction"
import AboutBody from "../../components/public/about/AboutBody"
import AboutHero from "../../components/public/about/AboutHero"
import Footer from "../../components/public/common/Footer"
import Navbar from "../../components/public/common/navigation/Navbar"
import "../../styles/public/about.css"
const AboutCompany = () => {
  return (
    <>
           <Navbar />
           <AboutHero />
           <AboutBody />
           <AboutAction />
           <AppNotification />
           <Footer />
    </>
  )
}

export default AboutCompany