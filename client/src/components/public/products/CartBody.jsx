import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import SelectedProductBox from "./SelectedProductBox";
import { AiOutlineDelete } from "react-icons/ai";
import { removeVariationFromShoppingCart } from "../../../redux/slices/public/cartSlice";
import emptyCart from "../../../assets/abandoned-cart.png"

const CartBody = () => {
    const { shopping_cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const removeVariation = (data, id) => {
            const payload = { data: data, id: id }
            dispatch(removeVariationFromShoppingCart(payload))
    }
  return (
    <div className="single-product-body">
              <div className="inner-row-2">
                         <div className="single-product-body-content">
                                   <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/cart"} className="product-link">Cart</Link>
                                   </div>

                                   <div className="cart-body-content">
                                            <h3>Your Shopping Cart</h3>
                                            { shopping_cart.length > 0 ? 
                                               <div className="cart-body-row">
                                                     <div className="cart-body-column">                
                                                                       <div className="shopping-cart-wrapper">
                                                                               <div className="cart-headings">
                                                                                          <h2>Product Image</h2>
                                                                                          <h2>Product Title</h2>
                                                                                          <h2>Product Price</h2>
                                                                                          <h2>Product Quantity</h2>
                                                                                          <h2>Product Subtotal</h2>
                                                                               </div>
                                                                               {  shopping_cart.map(product => 
                                                                            <div className="cart-moja" key={product._id}>
                                                                                       <div className="cart-moja-row">
                                                                                                 <div className="thumbnail">
                                                                                                           <img src={product.product_imagery.product_main_image} alt="" />
                                                                                                 </div>
                                                                                                 <div className="product-name">
                                                                                                           <h4>{product.product_title}</h4>
                                                                                                 </div>
                                                                                                 <div className="price">
                                                                                                             <span className="ksh">ksh.</span>
                                                                                                             <h4>{product.product_pricing.product_regular_price.toLocaleString()}</h4>
                                                                                                 </div>
                                                                                                 <div className="quantity">
                                                                                                           <figure>{product.quantity}</figure>
                                                                                                 </div>
                                                                                                 <div className="subtotal">
                                                                                                           <span className="ksh">ksh.</span>
                                                                                                           <h4>{(product.quantity * product.product_pricing.product_regular_price).toLocaleString()}</h4>
                                                                                                 </div>
                                                                                       </div>
                                                                                       <div className="variations-row">
                                                                                                    <div className="empty-div"></div>
                                                                                                    <div className="variation-type">
                                                                                                                <h4>Variation: {product.product_variations.product_variation_name}</h4>
                                                                                                    </div>
                                                                                                    <div className="chosen-variations">
                                                                                                                <h4>Chosen Variations:</h4>
                                                                                                                { product.variations.map(item => 
                                                                                                                        <div className="variation-column" key={item.id}>
                                                                                                                                    <SelectedProductBox  data={item} product_id={product._id} key={item.id}/>

                                                                                                                                    <span onClick={() => removeVariation(item, product._id)} className="delete"><AiOutlineDelete /></span>
                                                                                                                        </div>
                                                                                                                )}
                                                                                                    </div>
                                                                                                     <div className="empty-div"></div>
                                                                                       </div>
                                                                          </div>
                                                                         )
                                                                     }
                                                          </div>
                                                     </div>
                                                    <div className="cart-body-continue"></div>
                                            </div>
                                                 :
                                             <div className="cart-body-empty">
                                                   <div className="cart-box">
                                                            <div className="cart-box-image">
                                                                    <img src={emptyCart} alt="" />
                                                            </div>
                                                            <h4>Your cart is empty</h4>
                                                            <Link to={"/shop"}>Return to shop</Link>
                                                  </div>
                                            </div>
                                        }
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default CartBody