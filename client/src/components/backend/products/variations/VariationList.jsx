import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { openDeleteVariationModal, openVariationEditModal } from "../../../../redux/slices/utilSlice";

const VariationList = () => {
    const { variations } = useSelector(state => state.utils);
    const dispatch  = useDispatch();

    const deleteVariation = (id) => {
           dispatch(openDeleteVariationModal(id))
    }

    const editVariation = (item) => {
          dispatch(openVariationEditModal(item))
    }
  return (
    <div className="category-list">
              <h4>Variations</h4>

              <div className="category-list-table">
                        <table>
                                  <thead>
                                            <tr>
                                                      <th>Variation name</th>
                                                      <th>Components</th>
                                                      <th>Products</th>
                                                      <th>Actions</th>
                                            </tr>
                                  </thead>
                                  <tbody>
                                           { variations && variations.map(item => 
                                                  <tr key={item._id}>
                                                            <td>
                                                                     <div className="c-name">
                                                                              <h5>{item.name}</h5>
                                                                     </div>
                                                            </td>
                                                            <td>
                                                                 { item.name === "color" ? 
                                                                        <div className="v-list-colors">
                                                                                 { item.components.map(v => <span key={v.id} style={{ background: `${v.name}`}} title={v.name}></span>)}
                                                                        </div>
                                                                        :
                                                                      item.name === "fabric" ?
                                                                            <div className="v-list-fabric">
                                                                                    { item.components.map(v => <img src={v.name} key={v.id} alt="fabric-color"/>)}
                                                                            </div>
                                                                        :
                                                                    <div className="v-list">
                                                                              { item.components.map(v => <span key={v.id}>{v.name}</span>)}
                                                                    </div>
                                                                  }
                                                            </td>
                                                            <td>{ item.products || 0}</td>
                                                            <td>
                                                                      <div className="c-actions">
                                                                                <span title="edit" onClick={() => editVariation(item)}><CiEdit /></span>
                                                                                <span title="delete" onClick={() => deleteVariation(item._id)}><AiOutlineDelete /></span>
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

export default VariationList