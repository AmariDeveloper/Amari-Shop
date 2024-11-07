/* eslint-disable react/prop-types */
//import { useEffect } from "react";
import { addProductToShoppingCartFromProductPage } from "../../../redux/slices/public/cartSlice";
import SelectedProductBox from "./SelectedProductBox"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const BasketSection = ({ product }) => {
  const { selectedProductVariations } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToShoppingCart = () => {
         //calculate quantity
         const count = selectedProductVariations.reduce((total, curr) => total + curr.quantity, 0);
          const payload = { data: product, quantity: count, variations: selectedProductVariations}
          dispatch(addProductToShoppingCartFromProductPage(payload));
          navigate("/cart")
  }

  return (
    <div className="basket-section">
              <h3>Selected Variations</h3>
              
               { selectedProductVariations.length > 0 ? 
                      selectedProductVariations.map(vr => <SelectedProductBox data={vr}  key={vr.id}/>)
                     :
                     <p className="no-product">No products selected</p>
              }
              <div className="basket-action-btn">
                        <button  onClick={addToShoppingCart} className={ selectedProductVariations.length > 0 ? "btn-active" : ""}>Add to Cart</button>
              </div>
    </div>
  )
}

export default BasketSection