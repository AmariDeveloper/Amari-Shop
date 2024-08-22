import { FiAlertTriangle } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { closeDeleteProductModal } from "../../redux/slices/productUtilSlice";
import { useDeleteProductMutation } from "../../redux/slices/productSlice";
import { setAppNotification } from "../../redux/slices/utilSlice";
const DeleteProductModal = () => {
    const { deleteProductModal } = useSelector(state => state.productUtils);
    const dispatch = useDispatch();
    //close modal
    const cancelModal = () => dispatch(closeDeleteProductModal())

    //initiate delete of product
    const [ DeleteProduct ] = useDeleteProductMutation();
    const deleteSelectedProduct = async(id) => {
           try {
                  const res = await DeleteProduct({ id }).unwrap();
                  if(res.error){
                    dispatch(closeDeleteProductModal());
                    dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
             }else{
                    dispatch(closeDeleteProductModal());
                    dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
             }
           } catch (error) {
                 dispatch(closeDeleteProductModal());
                 dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
           }
    }
  return (
    <div className={ deleteProductModal.status ? "modal active" : "modal"}>
               <div className="modal-body delete">
                          <span><FiAlertTriangle /></span>
                          <h3>Are you sure you want to delete this product?</h3>
                          <div className="modal-btns">
                                    <button onClick={cancelModal}>Cancel</button>
                                    <button onClick={() => deleteSelectedProduct(deleteProductModal.id)}>Delete</button>
                          </div>
               </div>
    </div>
  )
}

export default DeleteProductModal