import Footer from "../../components/public/common/Footer"
import Navbar from "../../components/public/common/navigation/Navbar"
import SingleProductBody from "../../components/public/products/SingleProductBody"
import "../../styles/public/product.css"
const SingleProduct = () => {
  return (
    <>
          <Navbar />
          <SingleProductBody />
          <Footer />
    </>
  )
}

export default SingleProduct