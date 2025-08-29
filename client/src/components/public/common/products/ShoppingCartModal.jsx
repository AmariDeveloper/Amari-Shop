import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import { useCallback, useEffect, useRef, useState } from "react";
import { closeShoppingCartSidebar, removeProductFromShoppingCart } from "../../../../redux/slices/public/cartSlice";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import { clearOrderId } from "../../../../redux/slices/public/billingSlice";

const ShoppingCartModal = () => {
    const { isSidebarCartOpen, shopping_cart } = useSelector(state => state.cart);
    const { session } = useSelector(state => state.client)
    const cartRef = useRef();
    const cartChildRef = useRef();
    const dispatch = useDispatch();
    const [ subtotal, setSubtotal] = useState(0)

    const closeShoppingBasket = () => dispatch(closeShoppingCartSidebar());

    const handleOutsideClick = useCallback((e) => {
               if(cartChildRef.current && !cartChildRef.current.contains(e.target)){
                     dispatch(closeShoppingCartSidebar())
               }else{
                     return;
               }
    }, [dispatch])

    useEffect(() => {
            document.addEventListener("click", handleOutsideClick, true);
    }, [handleOutsideClick])

    useEffect(() => {
           if(isSidebarCartOpen){
                  cartRef.current.classList.add("active");
                  gsap.to(cartRef.current.querySelector(".shopping-cart-modal-content"), {
                         x: 0,
                         duration: 0.8
                  })
           }else{
                  gsap.to(cartRef.current.querySelector(".shopping-cart-modal-content"), {
                         x: "105%",
                         duration: 0.8
                   })

                   setTimeout(() => {
                          cartRef.current.classList.remove("active");
                   }, 1200)
           }
    }, [isSidebarCartOpen])


    const handleRemoveFromBasket = (id) => {
          dispatch(removeProductFromShoppingCart(id))
    }

    //Clear Order Id
    useEffect(() => {
          if(shopping_cart && shopping_cart.length === 0){
                dispatch(clearOrderId())
          }
    }, [dispatch, shopping_cart])

    //calculate subtotal
    useEffect(() => {
            if(shopping_cart && shopping_cart.length > 0){
                  const extract = shopping_cart.map(item => {
                         let newStuff = {
                               product_price: item.product_pricing.product_regular_price,
                               quantity: item.quantity
                         }
                         return newStuff;
                  })
                  const total = extract.reduce((accumulator, item) => {
                         return accumulator += (item.product_price*item.quantity)
                  }, 0)
                  setSubtotal(total)
            }
    }, [shopping_cart])

    
  return (
    <div ref={cartRef} className="shopping-cart-modal">
              <div ref={cartChildRef} className="shopping-cart-modal-content">
                        <div className="shopping-cart-header">
                                    <div className="left-cart-aligned">
                                                 <h3>Shopping Cart</h3>
                                                <figure>{shopping_cart.length}</figure>
                                    </div>
                                   <span onClick={closeShoppingBasket}><CgClose /></span>
                        </div>
                         <div className="shopping-cart-modal-body">
                                  { shopping_cart.length > 0 ?
                                          <div className="shopping-modal-body-content">
                                                    <div className="shopping-cart-selected-products">
                                                            { shopping_cart.map(product => 
                                                                <div className="select-product-moja" key={product._id}>
                                                                       <div className="select-product-moja-column">
                                                                                   <img src={product.product_imagery.product_main_image} alt="" />
                                                                                   <div className="product-moja-texts">
                                                                                            <h3>{product.product_title}</h3>
                                                                                            <div className="quantity-and-price">
                                                                                                        <h5>{product.quantity}</h5>
                                                                                                        <span><IoCloseOutline /></span>
                                                                                                        <h4><span className="ksh">ksh.</span>{product.product_pricing.product_regular_price}</h4>
                                                                                            </div>
                                                                                   </div>
                                                                       </div>
                                                                       <span onClick={() => handleRemoveFromBasket(product._id)} className="remove-btn" title="Remove from cart"><CgClose /></span>
                                                             </div>
                                                              )
                                                           }
                                                        </div>

                                                        <div className="basket-actions">
                                                                    <div className="basket-subtotal">
                                                                                <h4>Subtotal: </h4>
                                                                                <h5><span className="ksh">ksh.</span>{subtotal.toLocaleString()}</h5>
                                                                    </div>
                                                                    <div className="basket-buttons">
                                                                              { session.isLoggedIn ? <Link to={"/checkout"} onClick={closeShoppingBasket}>Checkout</Link> : ""}
                                                                             
                                                                             <Link to={"/cart"} onClick={closeShoppingBasket}>View Cart</Link>
                                                                    </div>
                                                        </div>
                                          </div>
                                       :
                                        <div className="nothing-in-the-basket">
                                                  <p>No products in the Shopping cart</p>
                                         </div>
                                    }
                         </div>
              </div>
    </div>
  )
}

export default ShoppingCartModal