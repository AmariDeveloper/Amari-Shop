/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CategoriesDropdown = ({ status, handleStatus }) => {
    const dropdownRef = useRef();
    const handleOutsideClick = useCallback((e) => {
             if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                    handleStatus(false)
             }else{
                    handleStatus(true)
             }
    }, [handleStatus])

    useEffect(() => {
           document.addEventListener("click", handleOutsideClick, true);
    }, [])
  return (
    <div ref={dropdownRef} className={ status ? "categories-dropdown active" : "categories-dropdown"}>
            <ul>
                     <li><Link to={"/"}>Category 1</Link></li>
                     <li><Link to={"/"}>Category 1</Link></li>
                     <li><Link to={"/"}>Category 1</Link></li>
                     <li><Link to={"/"}>Category 1</Link></li>
            </ul>
    </div>
  )
}

export default CategoriesDropdown