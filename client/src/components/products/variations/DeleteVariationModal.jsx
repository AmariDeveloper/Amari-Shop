import { useDispatch, useSelector } from "react-redux"
import { closeDeleteVariationModal, setAppNotification } from "../../../redux/slices/utilSlice";
import { useDeleteVariationMutation } from "../../../redux/slices/productSlice";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteVariationModal = () => {
    const { deleteVariationModal } = useSelector(state => state.utils);
    const dispatch = useDispatch();

    //cancel delete modal
    const cancelModal = () => {
        dispatch(closeDeleteVariationModal());
    }

    const [removeVariation] = useDeleteVariationMutation();

    const deleteSelectedVariation = async(id) => {
           try {
                const res = await removeVariation({ id }).unwrap();
                if(res.error){
                       dispatch(closeDeleteVariationModal());
                       dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
                }else{
                       dispatch(closeDeleteVariationModal());
                       dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                }
           } catch (error) {
                   dispatch(closeDeleteVariationModal());
                   dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
           }
    }
  return (
    <div className={ deleteVariationModal.status ? "modal active" : "modal"}>
                <div className="modal-body delete">
                            <span><FiAlertTriangle /></span>
                            <h3>Are you sure you want to delete this variation?</h3>
                            <div className="modal-btns">
                                      <button onClick={cancelModal}>Cancel</button>
                                      <button onClick={() => deleteSelectedVariation(deleteVariationModal.id)}>Delete</button>
                            </div>
                </div>
    </div>
  )
}

export default DeleteVariationModal