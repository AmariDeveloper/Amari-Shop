import AppNotification from "../../components/backend/common/AppNotification"
import Footer from "../../components/public/common/Footer"
import Navbar from "../../components/public/common/navigation/Navbar"
import CartBody from "../../components/public/products/CartBody"

const Cart = () => {
  return (
    <>
            <Navbar />
            <CartBody />
            <AppNotification />
            <Footer />
    </>
  )
}

export default Cart