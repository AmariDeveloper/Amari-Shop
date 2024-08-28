import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react";
import { closeShoppingCartSidebar } from "../../../../redux/slices/public/cartSlice";
import { IoCloseOutline } from "react-icons/io5";

const ShoppingCartModal = () => {
    const { isSidebarCartOpen, shopping_cart } = useSelector(state => state.cart);
    const cartRef = useRef();
    const cartChildRef = useRef();
    const dispatch = useDispatch();

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
                                  <div className="shopping-cart-selected-products">
                                              { shopping_cart.length > 0 ? 
                                                       shopping_cart.map(product => 
                                                                <div className="select-product-moja" key={product._id}>
                                                                       <div className="select-product-moja-column">
                                                                                   <img src={product.product_imagery.product_main_image} alt="" />
                                                                                   <div className="product-moja-texts">
                                                                                            <h3>{product.product_title}</h3>
                                                                                            <div className="quantity-and-price">
                                                                                                        <h3>1</h3>
                                                                                                        <span><IoCloseOutline /></span>
                                                                                                        <h2><span className="ksh">ksh.</span> 5,600</h2>
                                                                                            </div>
                                                                                   </div>
                                                                       </div>
                                                                       <span><CgClose /></span>
                                                             </div>
                                                       )
                                               : 
                                                    <div className="nothing-in-the-basket">
                                                             
                                                    </div>
                                               }
                                  </div>
                         </div>
              </div>
    </div>
  )
}

export default ShoppingCartModal