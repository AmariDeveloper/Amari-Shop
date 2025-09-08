/* eslint-disable react/prop-types */
import { TiStar } from "react-icons/ti";
import { RxMinus, RxPlus  } from "react-icons/rx";
import { LuCircleDotDashed } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addVariationToCartList, removeVariationFromCartList, resetVariationQuantityList, addProductToShoppingCartFromQuickView } from "../../../redux/slices/public/cartSlice";
import { crosscheckProductQuantity } from "../../../lib/products";

const ProductInfoBox = ({ product }) => {
    const [selected, setSelected ] = useState([]);
    const [ basketOpen, setBasketOpen ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ cartValue, setCartValue ] = useState(product.quantity ? product.quantity : 1);
    const [ stockError, setStockError ] = useState("")

    console.log(product)
     
    const handleSelected = (item) => {
             setBasketOpen(true)
             if(selected.map(v => v.id).includes(item.id)){
                    const filtered = selected.filter(sm => sm.id !== item.id);
                    setSelected(filtered);
                    dispatch(removeVariationFromCartList(item.id))
             }else{
                 setSelected([...selected, item]);
                 dispatch(addVariationToCartList({ data: product, item: item}))
             }
    }

    useEffect(() => {
            if(!basketOpen){
                  dispatch(resetVariationQuantityList());
            }
    }, [basketOpen, dispatch])

    useEffect(() => {
            if(product.variations && product.variations.length > 0){
                   setSelected(product.variations);
                   setBasketOpen(true)
                   for(let variation of product.variations){
                         dispatch(addVariationToCartList({ data: product, item: variation}))
                   }
            }
    }, [setSelected, product, dispatch])
    

    const increamentCartValue = () => {
         const inventory_no = product && product.product_inventory.product_stock_quantity;
         if(!crosscheckProductQuantity(inventory_no, cartValue)){
               setStockError(`Sorry. We do not have more than ${inventory_no} item(s) of this product.`)
         }else{
              setCartValue(prev => prev + 1);
         }
    }
    const decreamentCartValue = () => {
            if(cartValue === 1){
                  setCartValue(1)
            }else{
                 setCartValue(prev => prev - 1)
            }
            setStockError("")
    }

      //Add product to shopping cart
  const addProductToCart = (data) => {
      const payload = { data: data, quantity: cartValue}
      dispatch(addProductToShoppingCartFromQuickView(payload))
      navigate("/cart")
      setCartValue(1)
}
  return (
    <div className="product-info-section">
            <h2>{product.product_title}</h2>
            <div className="review-rating-strip">
                    <div className="wrap-box">
                           <span><TiStar /></span>
                           <p>4.8 Rating</p>
                    </div>
                    <div className="wrap-box">
                         <span><LuCircleDotDashed /></span>
                          <p>20+ Reviews</p>
                    </div>
            </div>
     
            <div className="short-description">
                       <p>{product.product_short_description}</p>
            </div>

           <div className={product.product_variations.product_selected_variations.length > 0  ? "pricing-box" : "pricing-box no-line"}>
                    <p>Price: </p>
                    <h3><span className="ksh">ksh.</span>{product.product_pricing.product_regular_price.toLocaleString()}</h3>
           </div>

          { product.product_variations.product_selected_variations.length > 0 ?
                    <div className="variation-wrapper">
                               <h4>Choose <span>{product.product_variations.product_variation_name}</span>:</h4>
                            <div className="variation-list">
                                   { product.product_variations.product_variation_name === "color"  ? 
                                             product.product_variations.product_selected_variations.map(variation => 
                                                   <div className={ selected.map(item => item.id).includes(variation.id) ? "var-color-box active" : 'var-color-box'} key={variation.id} onClick={() => handleSelected(variation)}>
                                                             <span style={{ background: `${variation.name}`}}></span>
                                                   </div>
                                             )
                                             :
                                             product.product_variations.product_variation_name === "fabric" ?
                                                   product.product_variations.product_selected_variations.map(variation => 
                                                          <div className={selected.map(item => item.id).includes(variation.id) ? "var-image-box active" : "var-image-box"} key={variation.id} onClick={() => handleSelected(variation)}>
                                                                    <img src={variation.name} alt="fabric image" />
                                                          </div>
                                                   )
                                             :
                                          product.product_variations.product_selected_variations.map(variation => 
                                                <div onClick={() => handleSelected(variation)} className={selected.map(item =>item.id).includes(variation.id) ? "var-box-btn active" : "var-box-btn"} key={variation.id}>
                                                           <span>{variation.name}</span>
                                                </div>
                                          )
                                    }
                            </div>
                  </div> 
                  :
                  <div className="product-quick-cart-options">
                              <div className="product-quick-cart-flex-items">
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
                              <p className="product-stock-error">{stockError}</p>
                  </div>
             }


             <div className="extra-product-stuff">
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
             </div>
</div>
  )
}

export default ProductInfoBox