import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { RxMinus, RxPlus  } from "react-icons/rx";

const CartBody = () => {
    const { shopping_cart } = useSelector(state => state.cart);
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
                                            <div className="cart-body-row">
                                                     <div className="cart-body-column">
                                                                 
                                                                { shopping_cart.length > 0 ?
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
                                                                                                           <h4>{(product.quantity * product.product_pricing.product_regular_price).toLocaleString()}</h4>
                                                                                                 </div>
                                                                                       </div>
                                                                                       <div className="variations-row">
                                                                                        
                                                                                       </div>
                                                                          </div>
                                                                         )
                                                                                      
                                                                               }
                                                                       </div>
                                                                       :
                                                                      <div className="cart-body-empty">

                                                                      </div>
                                                                }
                                                     </div>
                                                    <div className="cart-body-continue"></div>
                                            </div>
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default CartBody