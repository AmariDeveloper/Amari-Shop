import AppNotification from "../../components/backend/common/AppNotification"
import Footer from "../../components/public/common/Footer"
import Navbar from "../../components/public/common/navigation/Navbar"
import BillingConfirmationBody from "../../components/public/products/BillingConfirmationBody"
import "../../styles/public/billing.css"

const BillingConfirmation = () => {
  return (
    <>
           <Navbar />
           <BillingConfirmationBody />
           <AppNotification />
           <Footer />
    </>
  )
}

export default BillingConfirmation