import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { clearActionBar } from "../../../redux/slices/public/cartSlice";

const CartActionBar = () => {
    const { actionBar }  = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
            if(actionBar.status){
                setTimeout(() => {
                    dispatch(clearActionBar());
               }, 3000)
            }
    }, [actionBar,dispatch])
  return (
    <div className={ actionBar.status ? "action-bar active" : "action-bar"}>
            <div className="left-bar">
                     <div className="product-image">
                                <img src={actionBar.data && actionBar.data.product_imagery.product_main_image} alt="" />
                      </div>
                      <div className="product-name">
                               <h5>{actionBar.data && actionBar.data.product_title.slice(0, 20)}...</h5>
                               <p>Added to Cart Successfully</p>
                      </div>
            </div>
             <span><LuCheck /></span>
    </div>
  )
}

export default CartActionBar