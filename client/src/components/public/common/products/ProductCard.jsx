/* eslint-disable react/prop-types */
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {  openQuickViewModal } from "../../../../redux/slices/public/clientSlice";
import { addProductToShoppingCart } from "../../../../redux/slices/public/cartSlice";
import { PiCheckLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
   const dispatch = useDispatch();
   const { shopping_cart } = useSelector(state => state.cart);
   const navigate = useNavigate();
  
   const isAlreadyInCart = shopping_cart.map(item => item._id).includes(data._id);

   const openQuickView = (product) => {
           dispatch(openQuickViewModal(product))
   };

   const addToShoppingCart = (product) => {
          dispatch(addProductToShoppingCart(product))
   }
  return (
    <div className="client-product-card">
              <div className="image-wrapper">
                       { data.product_variations.product_selected_variations.length == 0  && 
                        <div className="add-to-cart-box" >
                                  { isAlreadyInCart ?  <span className="checked"><PiCheckLight /></span> : <span onClick={() => addToShoppingCart(data)} ><HiOutlineShoppingCart /></span> }
                        </div> }
                       <img src={data.product_imagery.product_main_image} alt="" />
                        {  data.product_variations.product_selected_variations.length > 0 || isAlreadyInCart  ? "" :  <button onClick={() => openQuickView(data)}>Quick View</button> }
                      
              </div>
              <div className="product-name-row">
                       <h3 onClick={() => navigate(`/product/${data.product_slug}`)}>{data.product_title}</h3>
                       <h4><span>ksh.</span>{data.product_pricing.product_regular_price.toLocaleString()}</h4>
              </div>
    </div>
  )
}

export default ProductCard