import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { closeVariationEditModal, setAppNotification } from "../../../../redux/slices/utilSlice";
import { CgClose } from 'react-icons/cg';
import Spinner1 from "../../common/Spinner1";
import { MdOutlinePostAdd } from "react-icons/md";
import { useEditVariationMutation } from "../../../../redux/slices/productSlice";

const EditVariationModal = () => {
    const { editVariationModal } = useSelector(state => state.utils);
    const dispatch = useDispatch();
    const [id, setId] = useState(`${Math.random().toString(36).substring(2, 7)}`)
    const [ components, setComponents ] = useState([])
    const componentRef = useRef();
    const { register, handleSubmit, formState: { errors}, reset}= useForm({
             defaultValues: {
                    name: "",
                    description: "",
                    components: ""
             }
    })

    useEffect(() => {
             const defaults = {
                    name: editVariationModal.data ? editVariationModal.data.name : "",
                    description: editVariationModal.data ? editVariationModal.data.description: "",
                    components: editVariationModal.data ? editVariationModal.data.components: ""
             }
             reset(defaults)
    }, [editVariationModal, reset])

    useEffect(() => {
            if(editVariationModal.data){
                 setComponents(editVariationModal.data.components)
            }
    }, [editVariationModal])

    const closeModal = () => {
        dispatch(closeVariationEditModal());
    }

    const addComponent = () => {
             if(componentRef.current.value === ""){
                    return;
             }

             setComponents([
                   ...components,
                   { id: id, name: componentRef.current.value}
             ])
             setId(`${Math.random().toString(36).substring(2, 7)}`);
             componentRef.current.value = ""
    }
    const removeComponent = (id) => {
            setComponents(components.filter(item => item.id !== id))
    }

    const [ editVariation, { isLoading } ] = useEditVariationMutation();

    const handleEditVariation = async(data) => {
             const formData = {
                   name: data.name,
                   description: data.description,
                   components: components
             }

             try {
                   const res = await editVariation(formData).unwrap();
                   if(res.error){
                         dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}));
                   }else{
                        closeModal();
                        dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                   }
             } catch (error) {
                    dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
             }
    }
  return (
    <div className={ editVariationModal.status ? "modal active" : "modal"}>
              <div className="modal-body edit">
                       <h3>Edit this Variation</h3>
                       <form onSubmit={handleSubmit(handleEditVariation)}>
                                 <div className="form-row">
                                          <label htmlFor="name">Variation name</label>
                                          <input type="text" {...register("name", { required: "This input is required"})} className="input-control" placeholder="Enter variation name" />
                                          <span className="error">{errors.name && errors.name.message}</span>
                                 </div>
                                 <div className="form-row">
                                            <label htmlFor="description">Variation description</label>
                                            <textarea className="textarea-control" {...register("description")} placeholder="Describe this category"></textarea>
                                            <span className="error">{errors.description && errors.name.description}</span>
                                   </div>
                                   <div className="form-row">
                                           <label htmlFor="components">Variation Components</label>
                                           <div className="special-form-input">
                                                     <input ref={componentRef} type="text" placeholder='Add a component'  className='input-control'   />
                                                      <span onClick={addComponent}>Add</span>
                                           </div>
                                           <div className="special-form-results">
                                                     { components.length > 0 && components.map(item => 
                                                            <div key={item.id} className="result">
                                                                     {item.name} <span title='remove' onClick={() => removeComponent(item.id)}><CgClose /></span>
                                                            </div>
                                                      )}
                                           </div>
                                  </div>
                                  <div className="form-row btns">
                                             <span onClick={closeModal} className="cancel">Cancel</span>
                                             <button>{ isLoading ? <Spinner1 /> : <span><MdOutlinePostAdd />Edit variation</span>}</button>
                                    </div>
                       </form>
              </div>
    </div>
  )
}

export default EditVariationModal