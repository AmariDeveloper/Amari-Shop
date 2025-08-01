import { useSelector } from "react-redux"
import ProductCard from "../common/products/ProductCard"
import QuickViewProductModal from "../common/products/QuickViewProductModal";
import CartActionBar from "../common/CartActionBar";

const HomeProducts = () => {
  const { all_published_products } = useSelector(state => state.client);

  return (
    <div className="home-products">
              <QuickViewProductModal />
              <CartActionBar />
             <div className="inner-row-2">
                      <div className="home-products-content">
                                 <h2 className="section-title">Most Popular Products</h2>
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

export default HomeProducts