import { useContext } from "react"
import { sidebarContext } from "../../lib/sidebarcontext"
import { HiOutlineMenu } from "react-icons/hi"
import Topbar from "../common/Topbar"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Sorter from "./Sorter";
import CollectionType from "./CollectionType";
import ProductCard from "./ProductCard";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import product1 from "../../assets/flops.jpg"
import { IoIosStar } from "react-icons/io";

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
                                     <table>
                                              <thead>
                                                        <tr>
                                                                  <th><span><MdOutlineCheckBoxOutlineBlank /></span></th>
                                                                  <th>Product Details</th>
                                                                  <th>Category</th>
                                                                  <th>Options</th>
                                                                  <th>Price</th>
                                                                  <th>Quantity</th>
                                                                  <th>Rate</th>
                                                                  <th>Actions</th>
                                                        </tr>
                                              </thead>
                                              <tbody>
                                                            <tr>
                                                                     <td><span><MdOutlineCheckBoxOutlineBlank /></span></td>
                                                                     <td className="p-deets">
                                                                                <div className="profile">
                                                                                          <img src={product1} alt="" className="profile-image"/>
                                                                                          <div className="profile-texts">
                                                                                                    <h3>Lengendary Fenty flip flops </h3>
                                                                                                    <p>Carefully crafted for comfort under...</p>
                                                                                          </div>
                                                                                </div>
                                                                     </td>
                                                                     <td className="p-categories">
                                                                              <span>Clothing</span>
                                                                              <span>Footware</span>
                                                                     </td>
                                                                     <td>Colors</td>
                                                                     <td className="p-price">
                                                                               <span>Ksh</span>
                                                                                <h4>2500</h4>
                                                                     </td>
                                                                     <td>11</td>
                                                                     <td>
                                                                              <div className="reviews">
                                                                                          <span></span>
                                                                              </div>
                                                                     </td>
                                                            </tr>
                                              </tbody>
                                     </table>
                          </div>
               </div>
    </div>
  )
}

export default ProductsBody