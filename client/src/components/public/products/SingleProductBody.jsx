import { Link, useParams } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import ProductInfoBox from "./ProductInfoBox";
import GallerSection from "./GallerSection";
import BasketSection from "./BasketSection";
const SingleProductBody = () => {
  const { name } = useParams();
  const { shopping_cart } = useSelector(state => state.cart);
  const { all_published_products } = useSelector(state => state.client);
  const isProductAlreadyInCart  = shopping_cart.find(item => item.product_slug === name);
  const product = isProductAlreadyInCart ? isProductAlreadyInCart :  all_published_products.find(item => item.product_slug === name);

  console.log(product)
  return (
    <div className="single-product-body">
              <div className="inner-row-2">
                         <div className="single-product-body-content">
                                   <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={`/shop/${product.product_categories[0].name.replaceAll(" ", "-").toLowerCase()}`}>{product.product_categories[0].name}</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/"} className="product-link">{product.product_title}</Link>
                                   </div>
                                   { product && product.product_variations.product_selected_variations.length > 0 ?
                                        <div className="single-product-data">
                                                   <GallerSection />
                                                   <ProductInfoBox product={product}  />
                                                   <BasketSection product={product} />
                                        </div>
                                        :
                                          <div className="simple-product-data">
                                                     <GallerSection />
                                                     <ProductInfoBox product={product} />
                                          </div>
                                     }
                                     {
                                          product.product_additional_info !== "" ? 
                                            <div className="additionals">
                                                    <h3>Additional Information</h3>
                                                     <p>{product.product_additional_info}</p>
                                           </div>
                                          :
                                          ""
                                     }
                                    
                         </div>
              </div>
    </div>
  )
}

export default SingleProductBody