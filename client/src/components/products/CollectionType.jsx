import { RxDashboard } from "react-icons/rx";
import { IoIosList } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
const CollectionType = () => {
    const [status, setStatus ] = useState(false)
    const [ collection, setCollection ] = useState("Collection type");
    const tabRef = useRef();

    const switchType = (param) => {
          setCollection(param)
          setStatus(!status)
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
                      <p>{collection}</p>
                      { collection === "List" ?  <span><IoIosList /></span> :  <span><RxDashboard  /></span>}
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