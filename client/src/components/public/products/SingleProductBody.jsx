import { Link, useParams } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProductInfoBox from "./ProductInfoBox";
import { selectorContext } from "./selectorContext";
import GallerSection from "./GallerSection";
import BasketSection from "./BasketSection";
const SingleProductBody = () => {
  const { name } = useParams();
  const [ selected, setSelected ] = useState({
           products: []
  })
  const { all_published_products } = useSelector(state => state.client);
  const product = all_published_products.find(item => item.product_slug === name);

  return (
    <div className="single-product-body">
              <div className="inner-row-2">
                         <div className="single-product-body-content">
                                   <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={`/category/${product.product_categories[0].name.replaceAll(" ", "-").toLowerCase()}`}>{product.product_categories[0].name}</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/"} className="product-link">{product.product_title}</Link>
                                   </div>
                                   <selectorContext.Provider value={[selected, setSelected]}>
                                                <div className="single-product-data">
                                                            <GallerSection />
                                                            <ProductInfoBox product={product}  />
                                                            <BasketSection />
                                                </div>
                                   </selectorContext.Provider>
                         </div>
              </div>
    </div>
  )
}

export default SingleProductBody