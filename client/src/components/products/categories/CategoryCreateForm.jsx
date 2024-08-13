import dummy from "../../../assets/dummy.jpg"
import { MdOutlinePostAdd } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useCreateCategoryMutation } from "../../../redux/slices/productSlice";
import Spinner1 from "../../common/Spinner1";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../../../redux/slices/utilSlice";

const CategoryCreateForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
  const [ userImage, setUserImage ] = useState([])
  const [ imageUrl, setImageUrl] = useState([]);
  const [ status, setStatus] = useState(false);
  const dispatch = useDispatch();

const slugValue = watch("name", "")
useEffect(() => {
       const slug_val = slugValue.replaceAll(" ", "-").toLowerCase();
       setValue("slug", slug_val )
}, [setValue, slugValue])
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

const [ createCategory, { isLoading }] = useCreateCategoryMutation();

const handleCategoryForm = async(data) => {
       const formData = new FormData();
       formData.append("data", JSON.stringify(data));
  
       formData.append("categoryThumbnail", data.categoryThumbnail[0]);
      
       try {
            const res = await createCategory(formData).unwrap();
          
            if(res.error){
                 dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
            }else{
                  dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}))
                  reset();
                  clearImageThumbnail();
            }
       } catch (error) {
               reset();
               clearImageThumbnail();
              dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
       }
}
  return (
    <div className="category-form">
             <h4>Add new category</h4>
             <form onSubmit={handleSubmit(handleCategoryForm)}>
                       <div className="form-row">
                                <label htmlFor="name">Category name</label>
                                <input type="text" {...register("name", { required: "This input is required"})} className="input-control" placeholder="Enter category name" />
                                <span className="error">{errors.name && errors.name.message}</span>
                       </div>
                       <div className="form-row">
                                 <label htmlFor="slug">Category slug</label>
                                 <input type="text" {...register("slug")} value={slugValue.replaceAll(" ", "-").toLowerCase()} className="input-control"  />
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
                                          { status ? <img src={imageUrl} className="profile-image" alt="" /> :  <img src={dummy} className="profile-image" alt="" /> }
                                        
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
                       <div className="form-row">
                                <button>{ isLoading ? <Spinner1 /> : <span><MdOutlinePostAdd />Add category</span>}</button>
                       </div>
             </form>
    </div>
  )
}

export default CategoryCreateForm