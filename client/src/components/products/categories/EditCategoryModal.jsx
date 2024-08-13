import { useSelector,  useDispatch } from "react-redux"
import { MdOutlinePostAdd } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import Spinner1 from "../../common/Spinner1";
import { closeEditModal, setAppNotification } from "../../../redux/slices/utilSlice";
import { useEditCategoryMutation } from "../../../redux/slices/productSlice";

const EditCategoryModal = () => {
    const { editModal } = useSelector(state => state.utils)
    
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
        defaultValues: {
                name: "",
                slug: "",
                parent: "",
                description: "",
                categoryThumnail: ""
        }
    });

    useEffect(() => {
         const defaults = {
            name: editModal.data ? editModal.data.name : "",
            slug: editModal.data ? editModal.data.slug : "",
            parent: editModal.data ? editModal.data.parent : "",
            description: editModal.data ? editModal.data.description : "",
            categoryThumbnail: editModal.data ? editModal.data.thumbnail : ""
         }
         reset(defaults)
    }, [editModal, reset])
    const [ userImage, setUserImage ] = useState([])
    const [ imageUrl, setImageUrl] = useState([]);
    const [ status, setStatus] = useState(false);
    const dispatch = useDispatch();

   const slugValue = watch("name", "")

  useEffect(() => {
           const slug_val = slugValue.replaceAll(" ", "-").toLowerCase();
           setValue("slug", slug_val )
  }, [setValue, slugValue])

  
const closeModal = () => {
    dispatch(closeEditModal())
}
      //upload thumbnail image
    const uploadThumbnail = (e) => {
          setUserImage([...e.target.files]); 
    }

      //remove current/uploaded image
  const clearImageThumbnail = () => {
        setImageUrl([]);
        setUserImage([]);
        setStatus(false)
  }

  useEffect(() => {
         if(userImage.length < 1) return;

         const profileUrl = [];
         userImage.forEach(kitu => {
               profileUrl.push(URL.createObjectURL(kitu))
               setStatus(true)
          });
          setImageUrl(profileUrl)
}, [userImage]);

const [ editCategory, { isLoading }] = useEditCategoryMutation();

const handleEditCategoryForm = async(data) => {
        const category_id = editModal.data._id;
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("id", JSON.stringify(category_id));
        formData.append("categoryThumbnail", data.categoryThumbnail[0]);

        try{
             const res = await editCategory(formData).unwrap();

              if(res.error){
                   dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
              }else{
                   closeModal();
                   clearImageThumbnail();
                   dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
              }

        }catch(error){
              closeModal();
              clearImageThumbnail();
              dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
        }
}

  return (
    <div className={ editModal.status ? "modal active" : "modal"}>
              <div className="modal-body edit">
                         <h3>Edit this Category</h3>

                         <form onSubmit={handleSubmit(handleEditCategoryForm)}>
                                  <div className="form-row">
                                           <label htmlFor="name">Category name</label>
                                           <input type="text" {...register("name", { required: "This input is required"})} className="input-control" placeholder="Enter category name" />
                                           <span className="error">{errors.name && errors.name.message}</span>
                                  </div>
                                  <div className="form-row">
                                            <label htmlFor="slug">Category slug</label>
                                            <input type="text" {...register("slug")}  className="input-control"  />
                                  </div>
                                   <div className="form-row">
                                             <label htmlFor="parent">Parent category</label>
                                              <select className="input-control" {...register("parent")}>
                                                        <option value="None">None</option>
                                              </select>
                                   </div>
                                  <div className="form-row">
                                             <label htmlFor="description">Category Description</label>
                                             <textarea className="textarea-control" {...register("description")} placeholder="Describe this category"></textarea>
                                  </div>
                                  <div className="form-row">
                                          <label htmlFor="image">Category Thumbnail</label>
                                           <div className="image-area">
                                                     { status ? <img src={imageUrl} className="profile-image" alt="" /> :  <img src={editModal.data ? editModal.data.thumbnail : ""} className="profile-image" alt="" /> }
                                        
                                                    {  status ?
                                                         <div className="image-action">
                                                                    <span><IoCheckmark /></span>
                                                                    <p onClick={clearImageThumbnail}>Remove</p>
                                                         </div>
                                                          : 
                                                         <div className="uploader">
                                                                 <input type="file" {...register("categoryThumbnail", { onChange: uploadThumbnail })}  />
                                                   Upload Image
                                                         </div>
                                                   }
                                           </div>
                                  </div>
                                    <div className="form-row btns">
                                             <span onClick={closeModal} className="cancel">Cancel</span>
                                             <button>{ isLoading ? <Spinner1 /> : <span><MdOutlinePostAdd />Edit category</span>}</button>
                                    </div>
                        </form>
              </div>
    </div>
  )
}

export default EditCategoryModal