import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { closeCreateProductModal } from "../../redux/slices/utilSlice";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CiImageOn } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

const NewProductModal = () => {
    const { productModal } = useSelector(state => state.utils)
    const dispatch = useDispatch();
    const { register } = useForm();
    const closeProductModal = () => dispatch(closeCreateProductModal());
    const productModalRef = useRef();
    const [ productImage, setProductImage] = useState([]);
    const [ productImageUrl, setProductImageUrl] = useState([]);
    const [ status, setStatus ] = useState(false)
    const [ galleryImages, setGalleryImages ] = useState([])
    const [galleryStatus, setGalleryStatus] = useState(false)
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
                  setGalleryImages(
                        acceptedFiles.map(file => Object.assign(file, {
                               preview: URL.createObjectURL(file)
                        }))
                  )
                  setGalleryStatus(true)
            }
    })

    const removeGalleryImage = (id) => {
           const updatedList = galleryImages.filter(item => item.path !== id);
           setGalleryImages(updatedList)
    }
    useEffect(() => {
         if(!galleryImages.length > 0){
              setGalleryStatus(false)
         }
    }, [galleryImages])
    
  return (
    <div ref={productModalRef} className="product-modal">
               <div className="product-modal-content">
                        <div className="product-modal-header">
                                 <h3>Add new product</h3>
                                 <span onClick={closeProductModal}><CgClose /></span>
                         </div>

                         <form>
                                   <div className="product-modal-body">
                                             <div className="product-modal-column">
                                                         <div className="form-row">
                                                                     <label htmlFor="product title">Product Title</label>
                                                                     <input type="text" className="input-control" placeholder="Enter product title" />
                                                         </div>
                                                         <div className="form-row">
                                                                   <label htmlFor="product short description">Product Short Description</label>
                                                                    <textarea className="textarea-control" placeholder="Describe the product briefly"></textarea>
                                                         </div>

                                                         <div className="product-inventory">
                                                                   <h4 className="product-form-title">Inventory</h4>
                                                                   <div className="form-row split">
                                                                               <div className="form-row-column">
                                                                                        <label htmlFor="sku">SKU</label>
                                                                                        <input type="text" className="input-control" placeholder="Sku (if left blank will be autogenerated)" />
                                                                               </div>
                                                                               <div className="form-row-column">
                                                                                        <label htmlFor="stock status">Stock Status</label>
                                                                                        <select className="input-control">
                                                                                                  <option value="In Stock">In Stock</option>
                                                                                                  <option value="Out of Stock">Out of Stock</option>
                                                                                        </select>
                                                                               </div>
                                                                   </div>
                                                                   <div className="form-row split">
                                                                              <div className="form-row-column">
                                                                                         <label htmlFor="stock quantity">Stock Quantity</label>
                                                                                         <input type="number" className="input-control" placeholder="Stock Quantity" />
                                                                              </div>
                                                                              <div className="form-row-column">
                                                                                      <label htmlFor="sale type">Sold Individually</label>
                                                                                       <div className="form-input">
                                                                                                <input type="checkbox" className="checkbox-control" />
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
                                                                                         <input type="file" { ...register("product-main-image", { onChange: uploadProductMainImage})} />
                                                                              </div>
                                                                        }
                                                                 </div>

                                                                 <div className="form-row">
                                                                             <label htmlFor="gallery images">Product gallery images</label>

                                                                             <div className="product-gallery-trigger">
                                                                                         { galleryStatus ? 
                                                                                               <div className="uploaded-images">
                                                                                                       { galleryImages.length > 0 && galleryImages.map(image => 
                                                                                                              <div className="gallery-image-moja" key={image.path}>
                                                                                                                       <img src={image.preview} alt="" />
                                                                                                                       <span onClick={() => removeGalleryImage(image.path)}><RiDeleteBin6Line /></span>
                                                                                                              </div>
                                                                                                       )}
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
                                             <div className="product-modal-column"></div>
                                    </div>
                         </form>
               </div>
    </div>
  )
}

export default NewProductModal