/*eslint-disable react/prop-types */
import { RxMinus, RxPlus  } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { decrementVariationQuantityInCartList, incrementVariationQuantityInCartList } from "../../../redux/slices/public/cartSlice";
const SelectedProductBox = ({ data }) => {
  const dispatch = useDispatch();

  const incrementQuantity = () => dispatch(incrementVariationQuantityInCartList(data));
  const decrementQuantity = () => dispatch(decrementVariationQuantityInCartList(data));
  return (
              <div className="selected-product-box">
                          { data.name[0] === "#" ? 
                                   <div className="name-color-title">
                                            <span style={{ background: `${data.name}`}}></span>
                                   </div>
                                  :
                                  <div className="name-title">
                                            {data.name}
                                  </div>
                          }
                         <div className="range-box">
                                   <div className="quantity-ranger">
                                           <span onClick={decrementQuantity}><RxMinus /></span>
                                             <figure>{data.quantity}</figure>
                                             <span onClick={incrementQuantity}><RxPlus /></span>
                                   </div>
                                   <p>Qty: {data.quantity}</p>
                         </div>
              </div>
  )
}

export default SelectedProductBox