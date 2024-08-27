/* eslint-disable react/prop-types */
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { addProductToShoppingCart, openQuickViewModal } from "../../../../redux/slices/public/clientSlice";

const ProductCard = ({ data }) => {
   const dispatch = useDispatch();

   const openQuickView = (product) => {
           dispatch(openQuickViewModal(product))
   };

   const addToShoppingCart = (product) => {
          dispatch(addProductToShoppingCart(product))
   }
  return (
    <div className="client-product-card">
              <div className="image-wrapper">
                        <div className="add-to-cart-box" onClick={() => addToShoppingCart(data)} >
                                  <span><HiOutlineShoppingCart /></span>
                        </div>
                       <img src={data.product_imagery.product_main_image} alt="" />
                       <button onClick={() => openQuickView(data)}>Quick View</button>
              </div>
              <div className="product-name-row">
                       <h3>{data.product_title}</h3>
                       <h4><span>ksh.</span>{data.product_pricing.product_regular_price.toLocaleString()}</h4>
              </div>
    </div>
  )
}

export default ProductCard