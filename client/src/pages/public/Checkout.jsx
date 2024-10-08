import AppNotification from "../../components/backend/common/AppNotification"
import Footer from "../../components/public/common/Footer"
import Navbar from "../../components/public/common/navigation/Navbar"
import CheckoutBody from "../../components/public/products/CheckoutBody"

const Checkout = () => {
  return (
    <>
             <Navbar />
             <CheckoutBody />
             <AppNotification />
             <Footer />
    </>
  )
}

export default Checkout