import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { closeCreateProductModal, setAppNotification } from "../../../redux/slices/utilSlice";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CiImageOn } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import SMoja from "./utils/SMoja";
import ScMoja from "./utils/ScMoja";
import { clearSelectedVariation, removeSelectedVariation, setSelectedVariation } from "../../../redux/slices/productUtilSlice";
import { useCreateNewProductMutation } from "../../../redux/slices/productSlice";
//import {CKEditor} from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Spinner1 from "../common/Spinner1";

const NewProductModal = () => {
    const { productModal, categories, variations } = useSelector(state => state.utils)
    const { selectedVariation } = useSelector(state => state.productUtils);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const closeProductModal = () => dispatch(closeCreateProductModal());
    const productModalRef = useRef();
    const [ productImage, setProductImage] = useState([]);
    const [ productImageUrl, setProductImageUrl] = useState([]);
    const [ status, setStatus ] = useState(false)
    const [ galleryImages, setGalleryImages ] = useState([])
    const [galleryStatus, setGalleryStatus] = useState(false)
    const [ selectedCategories, setSelectedCategories ] = useState([])
    const [id, setId] = useState(`${Math.random().toString(36).substring(2, 7)}`);
    const [ variationType, setVariationType ] = useState("")
    const [ tags, setTags ] = useState([])
    const tagRef = useRef();
    const [ otherProductImages, setOtherProductImages ] = useState([])

    useEffect(() => {
           if(productModal.status){
                 productModalRef.current.classList.add("active")
                 gsap.to(productModalRef.current.querySelector(".product-modal-content"), {
                        x: 0,
                        duration: 0.8
                 })
           }else{
                 gsap.to(productModalRef.current.querySelector(".product-modal-content"), {
                        x: "100%",
                        duration: 0.8
                 })
                 setTimeout(() => {
                        productModalRef.current.classList.remove("active")
                 }, 1200)
           }
    }, [productModal])

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
            
                  const sanitized_newly_uploaded = acceptedFiles.map(file => Object.assign(file, {
                          preview: URL.createObjectURL(file)
                  }))
                  setGalleryImages([
                         ...galleryImages,
                         ...sanitized_newly_uploaded
                  ])
                  setGalleryStatus(true)
            }
    })

    const removeGalleryImage = (id) => {
           const updatedList = galleryImages.filter(item => item.path !== id);
           const updated_other_images_list = otherProductImages.filter(item => item.path !== id)
           setGalleryImages(updatedList)
           setOtherProductImages(updated_other_images_list)
    }

    

    //add categories
    const selectCategory = (e) =>{
             if(selectedCategories.map(item => item.name).includes(e)){
                  return;
             }
             setSelectedCategories([
                   ...selectedCategories,
                   { id: id, name: e}
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

//reset everything after successful upload
const resetProductForm = () => {
       dispatch(closeCreateProductModal());
       reset();
       setSelectedCategories([]);
       selectCategory("");
       switchVariationType("");
       setTags([]);
       setGalleryImages([]);
       setGalleryStatus(false);
       setStatus(false);
       dispatch(clearSelectedVariation())
}
    //POST request to create product
    const [ createNewProduct, { isLoading }] = useCreateNewProductMutation();

    const NewProduct = async(form_data) => {
         const formData = new FormData();
         const data = {
                 general: form_data,
                 categories: selectedCategories,
                 variations: { variationName: variationType, selected: selectedVariation},
                 tags: tags
         }
        const images = otherProductImages.concat(form_data["product-main-image"][0])
   
         formData.append("data", JSON.stringify(data));
         for (const file of images){
                formData.append("productImages", file);
         }
         
         try {
               const res = await createNewProduct(formData).unwrap();
               if(res.error){
                      dispatch(setAppNotification({ status: true, message: res.error.data.message, type: "Error"}))
               }else{
                     dispatch(setAppNotification({ status: true, message: res.message, type: "Success"}));
                     resetProductForm();
               }
         } catch (error) {
                //console.log(error)
                dispatch(setAppNotification({ status: true, message: error.data.message, type: "Error"}))
         }
    }
  return (
    <div ref={productModalRef} className="product-modal">
               <div className="product-modal-content">
                        <div className="product-modal-header">
                                 <h3>Add new product</h3>
                                 <span onClick={closeProductModal}><CgClose /></span>
                         </div>

                         <form onSubmit={handleSubmit(NewProduct)}>
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
                                                                                                       {  galleryImages.map(image => 
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
                                                                 <select className="input-control"  onChange={(e) => selectCategory(e.target.value)}>
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
                                                                   <label htmlFor="product variations">Product variations</label>
                                                                   <select className="input-control" onChange={(e) => switchVariationType(e.target.value)}>
                                                                              <option value="">Select variation</option>
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

export default NewProductModal