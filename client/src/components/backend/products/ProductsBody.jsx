import { useContext } from "react"
import { sidebarContext } from "../../../lib/sidebarcontext"
import { HiOutlineMenu } from "react-icons/hi"
import Topbar from "../common/Topbar"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Sorter from "./Sorter";
import CollectionType from "./CollectionType";
import ProductCard from "./ProductCard";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosStar,IoIosStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import NewProductModal from "./NewProductModal";
import { openCreateProductModal } from "../../../redux/slices/utilSlice";
import AppNotification from "../common/AppNotification";
import EditProductModal from "./EditProductModal";
import { openDeleteProductModal, openEditProductModal } from "../../../redux/slices/productUtilSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteProductModal from "./DeleteProductModal";

const ProductsBody = () => {
  // eslint-disable-next-line no-unused-vars
  const [sidebarStatus, setSidebarStatus] = useContext(sidebarContext);
  const { productCollectionType } = useSelector(state => state.utils)
  const { all_products } = useSelector(state => state.productUtils);
  const dispatch = useDispatch();

  const openNewProductModal = () => dispatch(openCreateProductModal());
  const openEditModal = (data) => dispatch(openEditProductModal(data));
  const openDeleteModal = (data) => dispatch(openDeleteProductModal(data))
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
              <AppNotification />
              <NewProductModal />
              <EditProductModal />
              <DeleteProductModal />
               <div className="products-strip-container">
                         <div className="products-header">
                                    <button onClick={openNewProductModal}><span><MdOutlineAddShoppingCart /></span> New Product</button>
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
                                      { all_products && all_products.length > 0 ?  all_products.map(product =>
                                                <ProductCard key={product._id} data={product}  />
                                       ) : "No products yet"}                        
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
                                            { all_products && all_products.length > 0 ? all_products.map(product => 
                                                <tr key={product._id}>
                                                       <td><span className="p-check"><MdOutlineCheckBoxOutlineBlank /></span></td>
                                                       <td className="p-deets">
                                                                  <div className="profile">
                                                                            <img src={product.product_imagery.product_main_image} alt="" className="profile-image"/>
                                                                            <div className="profile-texts">
                                                                                      <h3>{product.product_title}</h3>
                                                                                      <p>{product.product_short_description.slice(0, 35)}...</p>
                                                                            </div>
                                                                  </div>
                                                       </td>
                                                       <td className="p-categories">
                                                                    {product.product_categories.length > 0 && product.product_categories.map(item => <span key={item.id}>{item.name}</span>)}
                                                       </td>
                                                       <td>
                                                                { product.product_variations && product.product_variations.product_variation_name === 'color' ?
                                                                       <div className="v-list-colors">
                                                                                 { product.product_variations.product_selected_variations.map(v => 
                                                                                        <span key={v.id} style={{ background: `${v.name}`}} title={v.name}></span>
                                                                                 )}
                                                                       </div>
                                                                      :  product.product_variations.product_variation_name === "fabric" ?
                                                                        <div className="v-list-fabric">
                                                                                  { product.product_variations.product_selected_variations.map(v => 
                                                                                        <img src={v.name} key={v.id} alt="fabric-color"/>
                                                                                  )}
                                                                        </div>
                                                                        :
                                                                      <div className="option-results">
                                                                        { product.product_variations.product_selected_variations.length > 0 ? 
                                                                              <>
                                                                                   { product.product_variations.product_selected_variations.map(item => <div className="result" key={item.id}>{item.name}</div>)}
                                                                              </> : "-"}
                                                                     </div>
                                                                 }
                                                                 
                                                       </td>
                                                       <td>
                                                                 <div className="p-price">
                                                                          <span>Ksh</span>
                                                                          <h4>{product.product_pricing.product_regular_price}</h4>
                                                                 </div>
                                                       </td>
                                                       <td>{product.product_inventory.product_stock_quantity}</td>
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
                                                                          <span onClick={() => openEditModal(product)}>Edit</span>
                                                                          <span onClick={() => openDeleteModal(product._id)}><RiDeleteBin6Line /></span>
                                                                </div>
                                                       </td>
                                              </tr>
                                            ): "No products fetched at this time."}
                                       </tbody>
                              </table>
                   </div>
                           }
                         

               </div>
    </div>
  )
}

export default ProductsBody