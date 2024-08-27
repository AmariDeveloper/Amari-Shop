import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux"
import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react";
import { closeShoppingCartSidebar } from "../../../../redux/slices/public/cartSlice";

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
              </div>
    </div>
  )
}

export default ShoppingCartModal