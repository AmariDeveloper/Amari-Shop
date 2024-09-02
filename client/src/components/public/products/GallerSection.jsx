import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const GallerSection = () => {
    const { name } = useParams();
    const { all_published_products } = useSelector(state => state.client);
    const product = all_published_products.find(item => item.product_slug === name);
  
    const ref_image = product && product.product_imagery.product_main_image;
    const [activeImage, setActiveImage] = useState(ref_image)
  return (
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
  )
}

export default GallerSection