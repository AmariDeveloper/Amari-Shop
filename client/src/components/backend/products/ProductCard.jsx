/* eslint-disable react/prop-types */
import { GiRoundStar } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { openEditProductModal } from "../../../redux/slices/productUtilSlice";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const openEditModal = () => dispatch(openEditProductModal(data))
  return (
    <div className="product-card" onClick={openEditModal}>
            <div className="product-image">
                     <img src={data.product_imagery.product_main_image} alt="" />
            </div>
            <div className="category-and-price">
                       <div className="categories">
                                  {data.product_categories.length > 0 && data.product_categories.map(item => <span key={item.id}>{item.name}</span>)}
                       </div>
                       <div className="price">
                                 <h3><span>Ksh.</span> {data.product_pricing.product_regular_price}</h3>
                       </div>
            </div>
            <div className="product-name">
                      <h3>{data.product_title}</h3>
            </div>
            <div className="reviews">
                      <span className="star"><GiRoundStar /></span>
                      <h4>4.5 <span>(45 reviews)</span></h4>
            </div>
    </div>
  )
}

export default ProductCard