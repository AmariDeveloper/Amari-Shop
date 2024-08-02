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
import { IoIosStar,IoIosStarOutline } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";


const ProductsBody = () => {
  // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  const { productCollectionType } = useSelector(state => state.utils)
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

                         { productCollectionType === "Grid" ?
                              <div className="products-body-row">
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                                        <ProductCard />
                              </div>
                              :
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
                                                              <td><span className="p-check"><MdOutlineCheckBoxOutlineBlank /></span></td>
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
                                                              <td>
                                                                        <div className="p-price">
                                                                                 <span>Ksh</span>
                                                                                 <h4>2500</h4>
                                                                        </div>
                                                              </td>
                                                              <td>11</td>
                                                              <td>
                                                                       <div className="reviews">
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStarOutline /></span>
                                                                                   <span>4.2(182)</span>
                                                                       </div>
                                                              </td>
                                                              <td>
                                                                      <div className="p-actions">
                                                                                 <span>Edit</span>
                                                                                 <span><FiMoreHorizontal /></span>
                                                                       </div>
                                                              </td>
                                                     </tr>
                                                     <br />
                                                     <tr>
                                                              <td><span className="p-check"><MdOutlineCheckBoxOutlineBlank /></span></td>
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
                                                              <td>
                                                                        <div className="p-price">
                                                                                 <span>Ksh</span>
                                                                                 <h4>2500</h4>
                                                                        </div>
                                                              </td>
                                                              <td>11</td>
                                                              <td>
                                                                       <div className="reviews">
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStar /></span>
                                                                                   <span><IoIosStarOutline /></span>
                                                                                   <span>4.2(182)</span>
                                                                       </div>
                                                              </td>
                                                              <td>
                                                                       <div className="p-actions">
                                                                                 <span>Edit</span>
                                                                                 <span><FiMoreHorizontal /></span>
                                                                       </div>
                                                              </td>
                                                     </tr>
                                       </tbody>
                              </table>
                   </div>
                           }
                         

               </div>
    </div>
  )
}

export default ProductsBody