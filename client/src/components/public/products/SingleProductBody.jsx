import { Link, useParams } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { useState } from "react";

const SingleProductBody = () => {
  const { name } = useParams();
  const { all_published_products } = useSelector(state => state.client);
  const product = all_published_products.find(item => item.product_slug === name);

  const ref_image = product && product.product_imagery.product_main_image;
  const [activeImage, setActiveImage] = useState(ref_image)

  return (
    <div className="single-product-body">
              <div className="inner-row">
                         <div className="single-product-body-content">
                                   <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={`/category/${product.product_categories[0].name.replaceAll(" ", "-").toLowerCase()}`}>{product.product_categories[0].name}</Link>
                                            <span><GoChevronRight /></span>
                                            <Link to={"/"} className="product-link">{product.product_title}</Link>
                                   </div>
                                   <div className="single-product-data">
                                            <div className="product-gallery-section">
                                                        <div className="product-main-image">
                                                                   <img src={activeImage} alt="" />
                                                        </div>
                                                        <div className="gallery-items-wrapper">
                                                                  <div className={activeImage === product.product_imagery.product_main_image ? "gallery-item active": "gallery-item"} onClick={() => setActiveImage(product.product_imagery.product_main_image)}>
                                                                            <img src={product.product_imagery.product_main_image} alt="" />
                                                                  </div>
                                                                  { product.product_imagery.product_gallery.length > 0 && product.product_imagery.product_gallery.map(image => 
                                                                         <div className={activeImage === image ? "gallery-item active" : "gallery-item"} key={image} onClick={() => setActiveImage(image)}>
                                                                                     <img src={image} alt=""/>
                                                                         </div>
                                                                  )}
                                                        </div>
                                            </div>
                                            <div className="product-info-section">
                                                     <h2>{product.product_title}</h2>
                                            </div>
                                            <div className="product-basket-section">
                                                        <p>Info about your selected products go here</p>
                                            </div>
                                   </div>
                         </div>
              </div>
    </div>
  )
}

export default SingleProductBody