/*eslint-disable react/prop-types */
import { useContext } from "react";
import { RxMinus, RxPlus  } from "react-icons/rx";
import { selectorContext } from "./selectorContext";

const SelectedProductBox = ({ data }) => {
    const [ chosenVariations, setChosenVariations ] = useContext(selectorContext);

    const incrementProductQuantity = () => {
             
    }
  return (
              <div className="selected-product-box">
                         <div className="name-title">
                                   {data.kitu.name}
                         </div>
                         <div className="range-box">
                                   <div className="quantity-ranger">
                                           <span><RxMinus /></span>
                                             <figure>{data.quantity}</figure>
                                             <span><RxPlus /></span>
                                   </div>
                                   <p>Qty: {data.quantity}</p>
                         </div>
              </div>
  )
}

export default SelectedProductBox