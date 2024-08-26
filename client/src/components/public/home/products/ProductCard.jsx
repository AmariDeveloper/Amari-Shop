/* eslint-disable react/prop-types */
import { HiOutlineShoppingCart } from "react-icons/hi2";
const ProductCard = ({ data }) => {
  return (
    <div className="client-product-card">
              <div className="image-wrapper">
                        <div className="add-to-cart-box">
                                  <span><HiOutlineShoppingCart /></span>
                        </div>
                       <img src={data.product_imagery.product_main_image} alt="" />
                       <button>Quick View</button>
              </div>
              <div className="product-name-row">
                       <h3>{data.product_title}</h3>
                       <h4><span>ksh.</span>{data.product_pricing.product_regular_price}</h4>
              </div>
    </div>
  )
}

export default ProductCard