/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../../redux/slices/utilSlice";

const CategoriesDropdown = ({ status, handleStatus }) => {
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.utils);
    const parentCategories = categories && categories.filter(item => item.parent === "None");
    const handleOutsideClick = useCallback((e) => {
             if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                    handleStatus(false)
             }else{
                    handleStatus(true)
             }
    }, [handleStatus])

    useEffect(() => {
           document.addEventListener("click", handleOutsideClick, true);
    }, [handleOutsideClick])

    const { data } = useGetCategoriesQuery({ refetchOnMountOrArgChange: true })
    useEffect(() => {
          if(data){
                dispatch(setCategories([...data.categories]))
          }
    }, [dispatch, data])
  return (
    <div ref={dropdownRef} className={ status ? "categories-dropdown active" : "categories-dropdown"}>
            <ul>
                    { categories && parentCategories.map(category => 
                           <li key={category._id}><Link to={"/"}>{category.name}</Link></li>
                    )}
            </ul>
    </div>
  )
}

export default CategoriesDropdown