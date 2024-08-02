import { RxDashboard } from "react-icons/rx";
import { IoIosList } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProductCollectionType } from "../../redux/slices/utilSlice";

const CollectionType = () => {
    const [status, setStatus ] = useState(false)
    const { productCollectionType } = useSelector(state => state.utils);
    const tabRef = useRef();
    const dispatch = useDispatch();

    const switchType = (param) => {
        
          setStatus(!status)
          dispatch(setProductCollectionType(param))
    }

    const tabCallback = useCallback((e) => {
             if(tabRef.current && !tabRef.current.contains(e.target)){
                    setStatus(false);
             }else{
                    setStatus(true)
             }
    }, [])

    useEffect(() => {
            document.addEventListener("click", tabCallback, true);
    }, [tabCallback])

  
  return (
    <div className="collection-option">
             <div onClick={() => setStatus(!status)} className="collection-option-selected">
                      <p>{productCollectionType}</p>
                      { productCollectionType === "List" ?  <span><IoIosList /></span> :  <span><RxDashboard  /></span>}
             </div>

             <div ref={tabRef} className={ status ? "tab-selection active" : "tab-selection"}>
                       <ul>
                               <li onClick={() => switchType("Grid")}><span><RxDashboard /></span> Grid</li>
                               <li onClick={() => switchType("List")}><span><IoIosList /></span> List</li>
                       </ul>
             </div>
    </div>
  )
}

export default CollectionType