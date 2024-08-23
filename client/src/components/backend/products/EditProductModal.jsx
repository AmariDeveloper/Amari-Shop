import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { closeEditProductModal, clearSelectedVariation, removeSelectedVariation, setSelectedVariation, setExistingSelectedVariation } from "../../../redux/slices/productUtilSlice";
import gsap from "gsap";
import { useDropzone } from "react-dropzone";
import SMoja from "./utils/SMoja";
import ScMoja from "./utils/ScMoja";
import Spinner1 from "../common/Spinner1";
import { useEditProductMutation } from "../../../redux/slices/productSlice";
import { setAppNotification } from "../../../redux/slices/utilSlice";


const EditProductModal = () => {
    const editProductModalRef = useRef();
    const { editProductModal, selectedVariation } = useSelector(state => state.productUtils)
    const { categories, variations } = useSelector(state => state.utils)
    const dispatch = useDispatch();
    const closeEditModal = () => dispatch(closeEditProductModal());
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
             defaultValues: {
                     product_title: "",
                     product_short_description: "",
                     product_sku: "",
                     product_stock_status: "",
                     product_stock_quantity: "",
                     product_sold_individually: "",
                     product_price: "",
                     product_selling_price: "",
                     product_additional_info: "",
                     product_categories: "",
                     product_variations: ""
             }
    })
   const [ status, setStatus ] = useState(false);
   const [ productImage, setProductImage] = useState([]);
   const [ productImageUrl, setProductImageUrl] = useState([]);
   const [galleryImages, setGalleryImages] = useState([]);
   const [galleryStatus, setGalleryStatus] = useState([]);
   const [otherProductImages, setOtherProductImages] = useState([])
   const [ selectedCategories, setSelectedCategories ] = useState([])
   const [id, setId] = useState(`${Math.random().toString(36).substring(2, 7)}`);
   const [ variationType, setVariationType ] = useState("")
   const [ tags, setTags ] = useState([])
   const tagRef = useRef();

    //opening and closing of the modal
    useEffect(() => {
          if(editProductModal.status){
                 editProductModalRef.current.classList.add("active");
                gsap.to(editProductModalRef.current.querySelector(".product-modal-content"), {
                       x: 0,
                       duration: 0.8
                })
          }else{
              gsap.to(editProductModalRef.current.querySelector(".product-modal-content"), {
                     x: "100%",
                     duration: 0.8
              })
              setTimeout(() => {
                     editProductModalRef.current.classList.remove("active")
              }, 1000)
          }
    }, [editProductModal])

    //Prefilling of inputs
    useEffect(() => {
          const defaults = {
                 product_title: editProductModal.data ? editProductModal.data.product_title : "",
                 product_short_description: editProductModal.data ? editProductModal.data.product_short_description : "",
                 product_sku: editProductModal.data ? editProductModal.data.product_inventory.product_sku_code : "",
                 product_stock_status: editProductModal.data ? editProductModal.data.product_inventory.product_stock_status : "",
                 product_stock_quantity: editProductModal.data ? editProductModal.data.product_inventory.product_stock_quantity : "",
                product_sold_individually: editProductModal.data ? editProductModal.data.product_inventory.is_product_sold_individually : false,
                product_price: editProductModal.data ? editProductModal.data.product_pricing.product_regular_price : "",
                product_selling_price: editProductModal.data ? editProductModal.data.product_pricing.product_selling_price : "",
                product_additional_info: editProductModal.data ? editProductModal.data.product_short_description : "",
                published_status: editProductModal.data ? editProductModal.data.product_publish_status : "",
                product_categories: editProductModal.data ? editProductModal.data.product_categories[0].name : "",
                product_variations: editProductModal.data ? editProductModal.data.product_variations.product_variation_name : "",
                brand: editProductModal.data ? editProductModal.data.product_brand : ""
            }
          reset(defaults);
    }, [editProductModal, reset])

    useEffect(() => {
               if(editProductModal.data){
                        if(editProductModal.data.product_imagery.product_main_image !== ""){
                              setStatus(true);
                              setProductImageUrl(editProductModal.data.product_imagery.product_main_image)
                        }

                         if(editProductModal.data.product_imagery.product_gallery.length > 0){
                              setGalleryStatus(true);
                              const existingGallery = editProductModal.data.product_imagery.product_gallery.map(item => {
                                     return { path: item, preview: item}
                              })
                              setGalleryImages(existingGallery)
                        }
                        if(editProductModal.data.product_categories && editProductModal.data.product_categories.length > 0){
                             setSelectedCategories(editProductModal.data.product_categories)
                        }
                        if(editProductModal.data.product_variations){
                                setVariationType(editProductModal.data.product_variations.product_variation_name);
                               dispatch(setExistingSelectedVariation(editProductModal.data.product_variations.product_selected_variations))
                        }
                        if(editProductModal.data.product_tags && editProductModal.data.product_tags.length){
                              setTags(editProductModal.data.product_tags)
                        }
               }
    }, [editProductModal, dispatch])

        //upload product main image
        const uploadProductMainImage = (e) =>{
            setProductImage([...e.target.files])
     }
 
     //remove uploaded main image
     const removeProductMainImage = () => {
            setProductImageUrl([]);
            setProductImage([]);
            setStatus(false);
     }
     //sanitize the upload process
     useEffect(() => {
          if(productImage.length < 1) return;
       
          const productTempUrl = [];
          productImage.forEach(image => {
                  productTempUrl.push(URL.createObjectURL(image));
          })
          setStatus(true);
          setProductImageUrl(productTempUrl)
     }, [productImage])
 
 
     //react dropzone
     const { getRootProps, getInputProps } = useDropzone({
             accept: {
                   "image/*": [".jpg", ".jpeg", ".png"]
             },
             onDrop: (acceptedFiles) => {
                   setOtherProductImages([...otherProductImages, ...acceptedFiles]);
                   const newly_uploaded =  acceptedFiles.map(file => Object.assign(file, {
                             preview: URL.createObjectURL(file)
                    }))
                    const sanitized_newly_uploaded = newly_uploaded.map(file => {
                           return { path: file.path, preview: file.preview}
                    })
                   setGalleryImages([
                           ...galleryImages,
                           ...sanitized_newly_uploaded
                   ])
                   setGalleryStatus(true)
             }
     }) 
    
     const removeGalleryImage = (id) => {
            const updatedList = galleryImages.filter(item => item.path !== id);
            const updated_other_images_list = otherProductImages.filter(item => item.path !== id);
            setGalleryImages(updatedList)
            setOtherProductImages(updated_other_images_list)
     }

        //add categories
    const selectCategory = (e) =>{
       console.log(e.target.value)
        if(selectedCategories.map(item => item.name).includes(e.target.value)){
             return;
        }
        setSelectedCategories([
              ...selectedCategories,
              { id: id, name: e.target.value}
        ])
        setId(`${Math.random().toString(36).substring(2, 7)}`)
}
//remove category
const removeCategory = (id) => {
      setSelectedCategories(
             selectedCategories.filter(item => item.id !== id)
      )
}

    //switch variation type
    const switchVariationType = (val) => {
       setVariationType(val);
       dispatch(clearSelectedVariation())
}

//add variation
const addVariation = (val) =>{
      if(selectedVariation.map(item => item.name).includes(val.name)){
            dispatch(removeSelectedVariation(val.name))
      }else{
           dispatch(setSelectedVariation(val))
     }
}

//Add Tags
const addTags = () => {
       if(tagRef.current.value === ""){
              return;
       }
       setTags([...tags, { name: tagRef.current.value}])
       tagRef.current.value = ""
}
//remove selected tag
const removeTag = (val) => {
      setTags(tags.filter(item => item.name !==val));
}


//submit edit form
const [ editProduct, { isLoading }] = useEditProductMutation();
const submitEditForm = async(form_data) => {
       const formData = new FormData();
        const data = {
                general: form_data,
                categories: selectedCategories,
                variations: { variationName: variationType, selected: selectedVariation },
                tags: tags
        }
       //prepare data for upload
       formData.append("data", JSON.stringify(data));
       productImage.length > 0 && formData.append("mainImage", form_data["product-main-image"][0]);
       if(otherProductImages.length > 0){
                  for(let file of otherProductImages){
                         formData.append("galleryImages", file);
                  }
        }
       try{
              const res = await editProduct(formData).unwrap();
              if(res.error){
                     dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
              }else{
                    dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}));
                    dispatch(closeEditProductModal());
              }
       }catch(error){
            //console.log(error)
            dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
       }
      
}     
  return (
    <div ref={editProductModalRef} className="product-modal">
              <div className="product-modal-content">
                        <div className="product-modal-header">
                                  <h3>Edit product</h3>
                                  <span onClick={closeEditModal}><CgClose /></span>
                        </div>

                        <form onSubmit={handleSubmit(submitEditForm)}>
                                   <div className="product-modal-body">
                                              <div className="product-modal-column">
                                                        <div className="form-row">
                                                                     <label htmlFor="product title">Product Title</label>
                                                                     <input type="text" {...register("product_title", { required: "This input is required"})} className="input-control" placeholder="Enter product title" />
                                                                     <span className="error">{errors.product_title && errors.product_title.message}</span>
                                                         </div>
                                                         <div className="form-row">
                                                                   <label htmlFor="product short description">Product Short Description</label>
                                                                    <textarea className="textarea-control" {...register("product_short_description")} placeholder="Describe the product briefly"></textarea>
                                                         </div>

                                                         <div className="product-inventory">
                                                                   <h4 className="product-form-title">Inventory</h4>
                                                                   <div className="form-row split">
                                                                               <div className="form-row-column">
                                                                                        <label htmlFor="sku">SKU</label>
                                                                                        <input type="text" {...register("product_sku")} className="input-control" placeholder="Sku (if left blank will be autogenerated)" />
                                                                               </div>
                                                                               <div className="form-row-column">
                                                                                        <label htmlFor="stock status">Stock Status</label>
                                                                                        <select {...register("product_stock_status")} className="input-control">
                                                                                                  <option value="In Stock">In Stock</option>
                                                                                                  <option value="Out of Stock">Out of Stock</option>
                                                                                        </select>
                                                                               </div>
                                                                   </div>
                                                                   <div className="form-row split">
                                                                              <div className="form-row-column">
                                                                                         <label htmlFor="stock quantity">Stock Quantity</label>
                                                                                         <input type="number" className="input-control" placeholder="Stock Quantity"{...register("product_stock_quantity", { required: "This input is required"})} />
                                                                                         <span className="error">{errors.product_stock_quantity && errors.product_stock_quantity.message}</span>
                                                                              </div>
                                                                              <div className="form-row-column">
                                                                                      <label htmlFor="sale type">Sold Individually</label>
                                                                                       <div className="form-input">
                                                                                                <input {...register("product_sold_individually")} type="checkbox" className="checkbox-control" />
                                                                                                <p>Limit purchases to 1 item per order</p>
                                                                                       </div>
                                                                              </div>
                                                                   </div>
                                                         </div>

                                                         <div className="product-imagery">
                                                                 <h4 className="product-form-title">Product Imagery</h4>

                                                                 <div className="form-row">
                                                                        <label htmlFor="product main image">Product main image</label>
                                                                         { status ?
                                                                                 <div className="product-choice-selection">
                                                                                            <div className="choice-display">
                                                                                                      <img src={productImageUrl} alt="" />
                                                                                            </div>
                                                                                            <h5 onClick={removeProductMainImage}><span><RiDeleteBin6Line /></span>Remove</h5>
                                                                                 </div>
                                                                             :
                                                                             <div className="product-choice-trigger">
                                                                                        <div className="choice-display">
                                                                                                   <span><CiImageOn /></span>
                                                                                        </div>
                                                                                        <h5><span><GoUpload /></span>Select the product&apos;s main image</h5>
                                                                                         <input type="file" { ...register("product-main-image", { required: "This input is required", onChange: uploadProductMainImage})} />
                                                                              </div>
                                                                        }
                                                                        
                                                                 </div>
                                                                 <span className="error">{errors["product-main-image"] && errors["product-main-image"].message}</span>

                                                                 <div className="form-row">
                                                                             <label htmlFor="gallery images">Product gallery images</label>

                                                                             <div className="product-gallery-trigger">         
                                                                                         { galleryStatus && galleryImages.length > 0 ? 
                                                                                               <div className="uploaded-images">
                                                                                                       { galleryImages.map(image => 
                                                                                                              <div className="gallery-image-moja" key={image.path}>
                                                                                                                       <img src={image.preview} alt="" />
                                                                                                                       <span onClick={() => removeGalleryImage(image.path)}><RiDeleteBin6Line /></span>
                                                                                                              </div>
                                                                                                       )}
                                                                                                       <div { ...getRootProps()} className="add-more-gallery-images">
                                                                                                                <input { ...getInputProps} className="dropy" />
                                                                                                                <span><GoUpload /></span>
                                                                                                                <p>Add More</p>
                                                                                                      </div>
                                                                                               </div>
                                                                                               :
                                                                                               <div {...getRootProps()} className="dropbox-container">
                                                                                                          <input {...getInputProps} className="dropy"/>
                                                                                                          <span><GoUpload /></span>
                                                                                                          <p>Drop files here or click to upload</p>
                                                                                               </div>
                                                                                         }
                                                                             </div>
                                                                 </div>
                                                         </div>

                                                         <div className="product-pricing">
                                                                    <h4 className="product-form-title">Pricing</h4>

                                                                    <div className="form-row split">
                                                                               <div className="form-column">
                                                                                           <label htmlFor="regular price">Regular Price</label>
                                                                                           <input type="number" pattern="+[0,9]" className="input-control" {...register("product_price", { required: "This input is required"})} placeholder="Enter price of product" />
                                                                                           <span className="error">{errors.product_price && errors.product_price.message}</span>
                                                                               </div>
                                                                               <div className="form-column">
                                                                                           <label htmlFor="selling price">Selling Price</label>
                                                                                           <input type="number" pattern="+[0,9]" className="input-control" {...register("product_selling_price")} placeholder="Enter offer price" />
                                                                               </div>
                                                                    </div>
                                                         </div>
                                                         <div className="additional-info">
                                                                    <h4 className="product-form-title">Additional Info</h4>
                                                                     <div className="form-row">
                                                                              <label htmlFor="product explanations">Product explanations</label>
                                                                              {/* <div className="ck-editor-form">
                                                                                        <CKEditor  editor={ ClassicEditor } />
                                                                              </div> */}
                                                                              <div className="additional-form">
                                                                                       <textarea { ...register("product_additional_info")} className="textarea-control" placeholder="Provide more information about the product"></textarea>
                                                                              </div>
                                                                     </div>
                                                         </div>
                                              </div>

                                              <div className="product-modal-column">
                                                       <div className="form-row">
                                                              <label htmlFor="Publish status">Publish Status</label>
                                                              <select {...register("published_status")} className="input-control">
                                                                       <option value="Published">Published</option>
                                                                       <option value="Draft">Draft</option>
                                                              </select>
                                                       </div>
                                                       <div className="form-row">
                                                                   <label htmlFor="product categories">Product Category</label>
                                                                   <select className="input-control" {...register("product_categories", {required: "Please add atleast one category", onChange: selectCategory})}>
                                                                          <option value="">Select category</option>
                                                                                { categories && categories.length > 0 && categories.map(item =>
                                                                                      <option key={item._id} value={item.name}>{item.name}</option>
                                                                               )}
                                                                   </select>
                                                                   <div className="selected-categories">
                                                                          { selectedCategories.map(item => 
                                                                                  <div key={item.id} className="result">
                                                                                             {item.name} <span onClick={() => removeCategory(item.id)}><CgClose /></span>
                                                                                  </div>
                                                                            )}
                                                                   </div>
                                                       </div>

                                                       <div className="form-row">
                                                                <label htmlFor="product variations">Product Variations</label>
                                                                <select className="input-control" {...register("product_variations", { onChange: (e) => switchVariationType(e.target.value)})}>
                                                                         <option value="">Select Variation</option>
                                                                         { variations && variations.length > 0 && variations.map(item => 
                                                                                      <option key={item._id} value={item.name}>{item.name}</option>
                                                                        )}
                                                                </select>
                                                                <div className="variation-choices">
                                                                             { variationType === "" ? "" :
                                                                                variationType === "color" ?
                                                                                     <div className="v-list-colors">
                                                                                             { variations && variations.length > 0 && variations.find(item => item.name === "color").components.map(c => <div className="type-box" onClick={() => addVariation(c)} key={c.id}><ScMoja key={c.id} c={c} /></div>)}
                                                                                     </div>
                                                                                     :
                                                                                     <div className="v-list">
                                                                                             { variations && variations.length > 0 && variations.find(item => item.name === variationType).components.map(c => <div onClick={() => addVariation(c)} className="type-box" key={c.id}>
                                                                                                            <SMoja key={c.id} c={c}    />
                                                                                             </div>)}
                                                                                     </div>
                                                                                }
                                                                   </div>
                                                       </div>

                                                       <div className="form-row">
                                                                 <label htmlFor="brand">Brand</label>
                                                                 <input type="text" {...register("brand")} className="input-control" placeholder="Enter the brand name" />
                                                       </div>

                                                       <div className="form-row">
                                                                 <label htmlFor="tags">Product Tags</label>
                                                                 <div className="special-form-input">
                                                                             <input ref={tagRef} type="text" className="input-control" placeholder="Enter tag name" />
                                                                             <span onClick={addTags}>Add</span>
                                                                 </div>
                                                                 <div className="special-form-results">
                                                                           { tags.map(item => 
                                                                                   <div key={item.name} className="result">{item.name}<span title="remove" onClick={() => removeTag(item.name)}><CgClose /></span></div>
                                                                             )}
                                                                 </div>
                                                       </div>

                                                       
                                                       <div className="form-row btn">
                                                                     <button>{ isLoading ? <Spinner1 /> : <span>Create Product</span>}</button>
                                                       </div>
                                              </div>
                                   </div>
                        </form>
              </div>
    </div>
  )
}

export default EditProductModal