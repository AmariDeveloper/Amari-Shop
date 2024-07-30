import { FiMoreHorizontal } from "react-icons/fi";
import handbag from "../../assets/handbag.jpg"
import oils from "../../assets/oils.jpg"
import flops from "../../assets/flops.jpg"
import sweater from "../../assets/sweater.jpg"

const PopularProducts = () => {
  return (
    <div className="popular-products">
               <div className="popular-header">
                        <h3>Top Selling Products</h3>
                        <span><FiMoreHorizontal /></span>
               </div>
                <table>
                          <thead>
                                    <tr>
                                           <th>Product Name</th>
                                           <th>Category</th>
                                           <th>Stock Status</th>
                                           <th>Total Sales</th>
                                    </tr>
                          </thead>
                          <tbody>
                                      <tr>
                                             <td>
                                                       <div className="profile">
                                                                <img className="profile-image" src={handbag} alt="" />
                                                                <h3>Classic Handbag 8Gr</h3>
                                                       </div>
                                             </td>
                                             <td>Clothing</td>
                                             <td><div className="status plus">In stock</div></td>
                                             <td>13.2k</td>
                                      </tr>
                                      <tr>
                                             <td>
                                                       <div className="profile">
                                                                <img className="profile-image" src={oils} alt="" />
                                                                <h3>Retinol SP50</h3>
                                                       </div>
                                             </td>
                                             <td>Beauty</td>
                                             <td><div className="status plus">In stock</div></td>
                                             <td>8.2k</td>
                                      </tr>
                                      <tr>
                                             <td>
                                                       <div className="profile">
                                                                <img className="profile-image" src={sweater} alt="" />
                                                                <h3>Orange Sweater Ex-Uk</h3>
                                                       </div>
                                             </td>
                                             <td>Clothing</td>
                                             <td><div className="status negative">Out of stock</div></td>
                                             <td>3.2k</td>
                                      </tr>
                                      <tr>
                                             <td>
                                                       <div className="profile">
                                                                <img className="profile-image" src={flops} alt="" />
                                                                <h3>Fenti Flip flops</h3>
                                                       </div>
                                             </td>
                                             <td>Clothing</td>
                                             <td><div className="status plus">In stock</div></td>
                                             <td>1.2k</td>
                                      </tr>
                          </tbody>
                </table>
    </div>
  )
}

export default PopularProducts