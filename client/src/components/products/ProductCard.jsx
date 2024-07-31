import product1 from "../../assets/sweater.jpg"
import { GiRoundStar } from "react-icons/gi";

const ProductCard = () => {
  return (
    <div className="product-card">
            <div className="product-image">
                     <img src={product1} alt="" />
            </div>
            <div className="category-and-price">
                       <div className="categories">
                                  <span>Fashion & Textiles</span>
                                  <span>Men</span>
                       </div>
                       <div className="price">
                                 <h3><span>Ksh.</span> 2,500</h3>
                       </div>
            </div>
            <div className="product-name">
                      <h3>Calvin Klein Sweater Mono Embroidered</h3>
            </div>
            <div className="reviews">
                      <span className="star"><GiRoundStar /></span>
                      <h4>4.5 <span>(45 reviews)</span></h4>
            </div>
    </div>
  )
}

export default ProductCard