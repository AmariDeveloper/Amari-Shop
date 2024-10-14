/*eslint-disable react/prop-types */
import { RxMinus, RxPlus  } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { decrementVariationQuantityInCartList, decrementVariationQuantityInShoppingCart, incrementVariationQuantityInCartList, incrementVariationQuantityinShoppingCart } from "../../../redux/slices/public/cartSlice";
import { useLocation } from "react-router-dom";
const SelectedProductBox = ({ data, product_id }) => {
  const dispatch = useDispatch();
  const incrementQuantity = () => dispatch(incrementVariationQuantityInCartList(data));
  const decrementQuantity = () => dispatch(decrementVariationQuantityInCartList(data));
  const decrementCartQuantity = () => {
         const payload = { data: data, id: product_id }
         dispatch(decrementVariationQuantityInShoppingCart(payload));
  }
  const incrementCartQuantity = () => {
     const payload = { data: data, id: product_id }
    dispatch(incrementVariationQuantityinShoppingCart(payload));
  }
  const { pathname } = useLocation();
  return (
           <>
                { pathname.slice(1) === "cart" ?
                          <div className="selected-product-box">
                                         { data.name[0] === "#" ? 
                                                  <div className="name-color-title">
                                                           <span style={{ background: `${data.name}`}}></span>
                                                  </div>
                                                 : data.name.startsWith("https") ?
                                                 <div className="fabric-title">
                                                           <img src={data.name} alt="" />
                                                 </div>
                                                 :
                                                 <div className="name-title">
                                                           {data.name}
                                                 </div>
                                         }
                                        <div className="range-box">
                                                  <div className="quantity-ranger">
                                                          <span onClick={decrementCartQuantity}><RxMinus /></span>
                                                            <figure>{data.quantity}</figure>
                                                            <span onClick={incrementCartQuantity}><RxPlus /></span>
                                                  </div>
                                                  <p>Qty: {data.quantity}</p>
                                        </div>
                             </div>
                :
                <div className="selected-product-box">
                           { data.name[0] === "#" ? 
                                    <div className="name-color-title">
                                             <span style={{ background: `${data.name}`}}></span>
                                    </div>
                                   : data.name.startsWith("https") ?
                                      <div className="fabric-title">
                                                <img src={data.name} alt="" />
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
              }
           </>
  )
}

export default SelectedProductBox