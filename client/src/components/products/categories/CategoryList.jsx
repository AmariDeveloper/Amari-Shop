import dummy from "../../../assets/dummy.jpg"
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openEditModal, openDeleteModal } from "../../../redux/slices/utilSlice";

const CategoryList = () => {
  const { categories } = useSelector(state => state.utils)
  const dispatch = useDispatch();

  const DeleteModal = (id) => {
         dispatch(openDeleteModal(id))
  }
  const EditModal = (item) => {
         dispatch(openEditModal(item))
  }
  return (
    <div className="category-list">
               <h4>Categories</h4>

               <div className="category-list-table">
                          <table>
                                   <thead>
                                            <tr>
                                                    <th>Category name</th>
                                                    <th>Slug</th>
                                                    <th>Products</th>
                                                    <th>Actions</th>
                                           </tr>
                                   </thead>
                                   <tbody>
                                              { categories && categories.map(item => 
                                                       <tr key={item._id}>
                                                                 <td> 
                                                                        <div className="c-name">
                                                                                 { item.thumbnail && item.thumbnail !== "" ?
                                                                                       <img src={item.thumbnail} className="profile-image" alt="" />
                                                                                       :
                                                                                       <img src={dummy} className="profile-image" alt="" />
                                                                                }
                                                                                  
                                                                                  <p>{item.name}</p>
                                                                        </div>
                                                                 </td>
                                                                 <td>{item.slug}</td>
                                                                 <td>{item.products}</td>
                                                                 <td>
                                                                          <div className="c-actions">
                                                                                    <span title="edit" onClick={() => EditModal(item)}><CiEdit /></span>
                                                                                    <span title="delete" onClick={() => DeleteModal(item.name)}><AiOutlineDelete /></span>
                                                                          </div>
                                                                 </td>
                                                        </tr>
                                              )}
                                   </tbody>
                          </table>
               </div>
    </div>
  )
}

export default CategoryList