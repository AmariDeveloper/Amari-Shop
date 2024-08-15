import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg';
import Spinner1 from "../../common/Spinner1";
import { MdOutlinePostAdd } from "react-icons/md";
import { useCreateVariationMutation } from '../../../redux/slices/productSlice';
import { useDispatch } from 'react-redux';
import { setAppNotification } from '../../../redux/slices/utilSlice';

const VariationsForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [components, setComponents] = useState([])
    const [id, setId] = useState(`${Math.random().toString(36).substring(2, 7)}`)
   const componentRef = useRef();
   const dispatch = useDispatch();

    const addComponent = () => {
           if(componentRef.current.value === ""){
                 return;
           }
           setComponents([
                 ...components,
                 { id: id, name: componentRef.current.value}
           ])
           
           setId(`${Math.random().toString(36).substring(2, 7)}`)
           componentRef.current.value = ""
    }
   
    const removeComponent = (id) => {
            setComponents(
                    components.filter(item => item.id !== id)
            )
    }
    
    const [ createVariation, { isLoading }] = useCreateVariationMutation();

    const handleVariationsForm = async(data) => {
        const formData = {
               name: data.name,
               description: data.description,
               components: components
        }
        try {
              const res = await createVariation(formData).unwrap();

              if(res.error){
                    dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
              }else{
                     dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}));
                     reset();
                     setComponents([])
              }
        } catch (error) {
              dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}));
        }

        reset();
    }

  return (
    <div className="category-form">
                <h4>Add new Variation</h4>
                <form onSubmit={handleSubmit(handleVariationsForm)}>
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
                                          { components.map(item => 
                                                 <div key={item.id} className="result">
                                                          {item.name} <span title='remove' onClick={() => removeComponent(item.id)}><CgClose /></span>
                                                 </div>
                                           )}
                                </div>
                       </div>

                       <div className="form-row">
                                <button>{ isLoading ? <Spinner1 /> : <span><MdOutlinePostAdd />Add Variation</span>}</button>
                       </div>
                </form>
    </div>
  )
}

export default VariationsForm