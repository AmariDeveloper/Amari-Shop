import { Link } from "react-router-dom"
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import ProductCard from "../common/products/ProductCard";
import QuickViewProductModal from "../common/products/QuickViewProductModal";
import CartActionBar from "../common/CartActionBar";
const ShopBody = () => {
    const { all_published_products } = useSelector(state => state.client);
  return (
    <div className="shop-body">
              <QuickViewProductModal />
              <CartActionBar />
            <div className="inner-row-2">
                   <div className="shop-body-content">
                              <div className="quick-links-strip">
                                        <Link to={"/"}>Home</Link>
                                       <span><GoChevronRight /></span>
                                       <Link to={"/shop"} className="product-link">All Products</Link>
                               </div>
                               <div className="breadcrumb">
                                      <h2>Shop</h2>
                                      <p>Browse all Products.</p>
                               </div>
                               <div className="products-row">
                                           { all_published_products.length > 0 ? 
                                              all_published_products.map(product => 
                                                               <ProductCard key={product._id} data={product} />
                                                        )
                                           : <p>Products are being fetched....stay tuned.</p>}
                               </div>
                   </div>
            </div>
    </div>
  )
}

export default ShopBody