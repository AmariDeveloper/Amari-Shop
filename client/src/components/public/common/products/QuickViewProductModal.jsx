import { RxStarFilled, RxStar,  RxMinus, RxPlus  } from "react-icons/rx";
import { Link } from "react-router-dom"
import { CgClose } from "react-icons/cg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeQuickViewModal } from "../../../../redux/slices/public/clientSlice";
import { addProductToShoppingCartFromQuickView } from "../../../../redux/slices/public/cartSlice";
import { crosscheckProductQuantity } from "../../../../lib/products";

const QuickViewProductModal = () => {
  const { quick_view_modal } = useSelector(state => state.client);
  const [ cartValue, setCartValue ] = useState(1);
  const [ stockErr, setStockErr ] = useState("")
  const dispatch = useDispatch();

  const increamentCartValue = () => {
        const inventory_no = quick_view_modal.data && quick_view_modal.data.product_inventory.product_stock_quantity;

        if(!crosscheckProductQuantity(inventory_no, cartValue )){
                setStockErr(`Sorry. We do not have more than ${inventory_no} item(s) of this product`)
        }else{
             setCartValue(prev => prev + 1)
        }
  };
  const decreamentCartValue = () => {
          if(cartValue === 1){
                setCartValue(1)
          }else{
               setCartValue(prev => prev - 1)
          }
          setStockErr("")
  }
  const closeQuickView = () => {
         dispatch(closeQuickViewModal());
         setCartValue(1)
  }

  //Add product to shopping cart
  const addProductToCart = (data) => {
         const payload = { data: data, quantity: cartValue}
         dispatch(addProductToShoppingCartFromQuickView(payload))
         dispatch(closeQuickViewModal());
         setCartValue(1)
  }

  const product = quick_view_modal.data ? quick_view_modal.data : null;


  return (
    <div className={ quick_view_modal.status ? "client-modal active" : "client-modal"}>
              <div className="client-modal-content">
                         <div className="image-row-column">
                                   <img src={product && product.product_imagery.product_main_image} alt="" />
                         </div>
                         <div className="description-row-column">
                                    <div className="sale-wrap">
                                              <p>Sale 84% off </p>
                                    </div>
                                    <span onClick={closeQuickView} className="modal-close"><CgClose /></span>
                                    <h2>{product && product.product_title}</h2>
                                    <div className="review-wrap">
                                               <div className="review-stars">
                                                         <span><RxStarFilled /></span>
                                                         <span><RxStarFilled /></span>
                                                         <span><RxStarFilled /></span>
                                                         <span><RxStarFilled /></span>
                                                         <span><RxStar /></span>
                                               </div>
                                               <p>4.0</p>
                                    </div>
                                    <div className="price-row">
                                               <h4>Price</h4>
                                               <h3><span className="ksh">ksh.</span>{product && product.product_pricing.product_regular_price.toLocaleString()}</h3>
                                    </div>
                                    <div className="price-short-description-row">
                                               <p>{product && product.product_short_description}</p>
                                    </div>

                                    <div className="product-quick-cart-options">
                                                 <div className="cart-number-adjustments">
                                                             <div className="adjust minus" onClick={decreamentCartValue}>
                                                                      <span><RxMinus /></span>
                                                             </div>
                                                             <div className="adjust-showcase">
                                                                       <h3>{cartValue}</h3>
                                                             </div>
                                                             <div className="adjust plus" onClick={increamentCartValue}>
                                                                        <span><RxPlus /></span>
                                                             </div>
                                                 </div>
                                                 <div className="add-to-cart-btn" onClick={() => addProductToCart(product)}>
                                                             <h4>Add to Cart</h4>
                                                 </div>
                                    </div>

                                    <div className="product-stock-error">
                                           <p>{stockErr}</p>
                                    </div>

                                    <div className="quick-product-extras">
                                               <div className="categories">
                                                       <h4>Categories: </h4>
                                                       <ul>
                                                               { product && product.product_categories.map(category => <li key={category._id}><Link to={""}>{category.name},</Link></li>)}                                   
                                                       </ul>
                                               </div>
                                               <div className="tags">
                                                        { product && product.product_tags.length > 0 && <h4>Tags: </h4> }
                                                        <ul>
                                                              { product && product.product_tags.map(tag => <li key={tag._id}><Link to={"/"}>{tag.name},</Link></li> )}
                                                        </ul>
                                               </div>
                                               {/* <div className="socials">
                                                        <h4>Share: </h4>
                                                         <ul>
                                                                  <li><Link to={"/"}>s</Link></li>
                                                         </ul>
                                               </div> */}
                                    </div>
                         </div>
              </div>
    </div>
  )
}

export default QuickViewProductModal