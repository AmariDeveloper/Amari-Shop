import { useEffect, useState } from "react"
import Sidebar from "../../components/backend/common/Sidebar"
import "../../styles/products.css"
import { sidebarContext } from "../../lib/sidebarcontext"
import ProductsBody from "../../components/backend/products/ProductsBody"
import { useGetAllVariationsQuery, useGetCategoriesQuery, useGetCreatedProductsQuery } from "../../redux/slices/productSlice"
import { useDispatch } from "react-redux"
import { setCategories, setVariations } from "../../redux/slices/utilSlice"
import { setAllProducts } from "../../redux/slices/productUtilSlice"

const Products = () => {
    const [status, setStatus] = useState(false)
    const { data: all_products } = useGetCreatedProductsQuery({ refetchOnMountOrArgChange: true})
    const { data: fetched_categories } = useGetCategoriesQuery({ refetchOnMountOrArgChange: true});
    const { data: fetched_variations } = useGetAllVariationsQuery({ refetchOnMountOrArgChange: true });
    const dispatch = useDispatch();

    useEffect(() => {
             if(fetched_categories){
                   dispatch(setCategories([...fetched_categories.categories]))
             }
             if(fetched_variations){
                 dispatch(setVariations([...fetched_variations.variations]))
             }
             if(all_products){
                  dispatch(setAllProducts([...all_products.products]))
             }
    }, [dispatch, fetched_categories, fetched_variations, all_products])
    
  return (
    <div className="dashboard-wrapper">
              <sidebarContext.Provider value={[status, setStatus]}>
                       <Sidebar />
                       <ProductsBody />
              </sidebarContext.Provider>
    </div>
  )
}

export default Products