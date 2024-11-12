import CartActionBar from "../common/CartActionBar"
import QuickViewProductModal from "../common/products/QuickViewProductModal"
import { Link, useParams } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import ProductCard from "../common/products/ProductCard";

const ShopCategoryBody = () => {
    const { category } = useParams();
    const { all_published_products } = useSelector(state => state.client)
    console.log(category)
   
    const category_products = all_published_products && 
                                                               all_published_products.filter(item => {
                                                                      const categories = item.product_categories.map(item => item.name.toLowerCase().replaceAll(" ", "-"));
                                                                     if(categories.includes(category)){
                                                                            return true;
                                                                     }else{
                                                                            return false;
                                                                     }
                                                               })

  return (
    <div className="shop-category-body">
             <QuickViewProductModal />
             <CartActionBar />
             <div className="inner-row-2">
                      <div className="shop-body-content">
                                <div className="quick-links-strip">
                                            <Link to={"/"}>Home</Link>
                                                   <span><GoChevronRight /></span>
                                                   <Link to={"/shop"} className="product-link capitalize">{category.replaceAll("-", " ")}</Link>
                                 </div>
                                 <div className="breadcrumb">
                                       <h2>{category.replaceAll("-", " ")}</h2>
                                 </div>

                                 <div className="products-row">
                                            { category_products.length > 0 ? 
                                                   category_products.map(product => 
                                                              <ProductCard key={product._id} data={product} />
                                                           )
                                               : <p>No products yet for this category</p>}
                               </div>
                    </div>
            </div>
    </div>
  )
}

export default ShopCategoryBody