import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { closeEditProductModal } from "../../redux/slices/productUtilSlice";
import gsap from "gsap";
import { useDropzone } from "react-dropzone";
const EditProductModal = () => {
    const editProductModalRef = useRef();
    const { editProductModal } = useSelector(state => state.productUtils)
    const dispatch = useDispatch();
    const closeEditModal = () => dispatch(closeEditProductModal());
    const { register, formState: { errors }, reset} = useForm({
             defaultValues: {
                     product_title: "",
                     product_short_description: "",
                     product_sku: "",
                     product_stock_status: "",
                     product_stock_quantity: "",
                     product_sold_individually: "",
             }
    })
   const [ status, setStatus ] = useState(false);
   const [ productImage, setProductImage] = useState([]);
   const [ productImageUrl, setProductImageUrl] = useState([]);
   const [galleryImages, setGalleryImages] = useState([]);
   const [galleryStatus, setGalleryStatus] = useState([]);
   const [otherProductImages, setOtherProductImages] = useState([])

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
                product_sold_individually: editProductModal.data ? editProductModal.data.product_inventory.is_product_sold_individually: false
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
               }
    }, [editProductModal])

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
      console.log(otherProductImages)
     const removeGalleryImage = (id) => {
            const updatedList = galleryImages.filter(item => item.path !== id);
            const updated_other_images_list = otherProductImages.filter(item => item.path !== id);
            setGalleryImages(updatedList)
            setOtherProductImages(updated_other_images_list)
     }
  return (
    <div ref={editProductModalRef} className="product-modal">
              <div className="product-modal-content">
                        <div className="product-modal-header">
                                  <h3>Edit product</h3>
                                  <span onClick={closeEditModal}><CgClose /></span>
                        </div>

                        <form>
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
                                              </div>
                                   </div>
                        </form>
              </div>
    </div>
  )
}

export default EditProductModal