import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteModal, setAppNotification } from "../../../../redux/slices/utilSlice";
import { useDeleteCategoryMutation } from "../../../../redux/slices/productSlice";

const DeleteCategoryModal = () => {
    const { deleteModal } = useSelector(state => state.utils);
    const dispatch = useDispatch();

    //cancel modal
    const cancelModal = () => {
          dispatch(closeDeleteModal())
    }

    //delete category
    const [ DeleteCategory ] = useDeleteCategoryMutation();

    const deleteSelectedCategory = async(name) => {
          try {
                const res = await DeleteCategory({ name }).unwrap();
                if(res.error){
                       dispatch(closeDeleteModal())
                       dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
                }else{
                       dispatch(closeDeleteModal())
                       dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                }
          } catch (error) {
                 dispatch(closeDeleteModal())
                dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
          }
    }

  return (
    <div className={ deleteModal.status ? "modal active" : "modal"}>
             <div className="modal-body delete">
                         <span><FiAlertTriangle /></span>
                         <h3>Are you sure you want to delete this category?</h3>
                         <div className="modal-btns">
                                  <button onClick={cancelModal}>Cancel</button>
                                  <button onClick={() => deleteSelectedCategory(deleteModal.category_name)}>Delete</button>
                         </div>
             </div>
    </div>
  )
}

export default DeleteCategoryModal