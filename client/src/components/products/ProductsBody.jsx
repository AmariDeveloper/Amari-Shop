import { useContext } from "react"
import { sidebarContext } from "../../lib/sidebarcontext"
import { HiOutlineMenu } from "react-icons/hi"
import Topbar from "../common/Topbar"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Sorter from "./Sorter";
import CollectionType from "./CollectionType";
import ProductCard from "./ProductCard";

const ProductsBody = () => {
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
 
  return (
    <div className="dashboard-body">
             <div className="top-wrapper">
                         <div className="top-texts">
                                   <span onClick={() => setSidebarStatus(true)} className="sidebar-btn">
                                            <HiOutlineMenu />
                                   </span>
                                  <h2>Products</h2>
                                  <p>View and manage products in your store</p>
                         </div>
                         <Topbar />
              </div>
               <div className="products-strip-container">
                         <div className="products-header">
                                    <button><span><MdOutlineAddShoppingCart /></span> New Product</button>
                                    <div className="product-options">
                                              <div className="search-area">
                                                      <span><CiSearch /></span>
                                                      <input type="text" className="search-control" placeholder="Search product name...etc" />
                                              </div>
                                             <Sorter />
                                              <CollectionType />
                                    </div>
                         </div>
                          <div className="products-body-row">
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                                    <ProductCard />
                          </div>
                          <div className="products-body-table">
                                     <h2>Table version goes here</h2>
                          </div>
               </div>
    </div>
  )
}

export default ProductsBody