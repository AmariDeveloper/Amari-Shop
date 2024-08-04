import dummy from "../../../assets/dummy.jpg"
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const CategoryList = () => {
  return (
    <div className="category-list">
               <h4>Categories</h4>

               <div className="category-list-table">
                          <table>
                                      <tr>
                                              <th>Category name</th>
                                              <th>Slug</th>
                                              <th>Products</th>
                                              <th>Actions</th>
                                      </tr>

                                      <tr>
                                               <td> 
                                                      <div className="c-name">
                                                                <img src={dummy} className="profile-image" alt="" />
                                                                <p>Submitted category</p>
                                                      </div>
                                               </td>
                                               <td>submitted-category</td>
                                               <td>10</td>
                                               <td>
                                                        <div className="c-actions">
                                                                  <span title="edit"><CiEdit /></span>
                                                                  <span title="delet"><AiOutlineDelete /></span>
                                                        </div>
                                               </td>
                                      </tr>
                                      <tr>
                                               <td> 
                                                      <div className="c-name">
                                                                <img src={dummy} className="profile-image" alt="" />
                                                                <p>Submitted category</p>
                                                      </div>
                                               </td>
                                               <td>submitted-category</td>
                                               <td>10</td>
                                               <td>
                                                        <div className="c-actions">
                                                                  <span title="edit"><CiEdit /></span>
                                                                  <span title="delet"><AiOutlineDelete /></span>
                                                        </div>
                                               </td>
                                      </tr>
                          </table>
               </div>
    </div>
  )
}

export default CategoryList