/* eslint-disable react/prop-types */
import { TiStar } from "react-icons/ti";
import { LuCircleDotDashed } from "react-icons/lu";
import { useContext, useState } from "react";
import { selectorContext } from "./selectorContext";

const ProductInfoBox = ({ product }) => {
    const [selected, setSelected ] = useState([]);
    const [ chosenVariations, setChosenVariations] = useContext(selectorContext);
     
    const handleSelected = (item) => {
             if(selected.map(v => v.id).includes(item.id)){
                    const filtered = selected.filter(sm => sm.id !== item.id);
                    setSelected(filtered);

                    const filteredList = chosenVariations.products.length && chosenVariations.products.filter(vr => vr.kitu.id !== item.id);
                    setChosenVariations({ products: filteredList})
             }else{
                 setSelected([...selected, item]);
                 setChosenVariations({ products: [...chosenVariations.products, { kitu: item, quantity: 1}]})
             }
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
                          <p>2.3k+ Reviews</p>
                    </div>
            </div>
     
            <div className="short-description">
                       <p>{product.product_short_description}</p>
            </div>

           <div className="pricing-box">
                    <p>Price: </p>
                    <h3><span className="ksh">ksh.</span>{product.product_pricing.product_regular_price.toLocaleString()}</h3>
           </div>

          { product.product_variations.product_selected_variations.length > 0 && 
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
                                          product.product_variations.product_selected_variations.map(variation => 
                                                <div onClick={() => handleSelected(variation)} className={selected.map(item =>item.id).includes(variation.id) ? "var-box-btn active" : "var-box-btn"} key={variation.id}>
                                                           <span>{variation.name}</span>
                                                </div>
                                          )
                                    }
                            </div>
                  </div>
             }
</div>
  )
}

export default ProductInfoBox