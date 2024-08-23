/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const ScMoja = ( { c }) => {
    const [active, setActive] = useState(false)
    const { selectedVariation } = useSelector(state => state.productUtils);

   useEffect(() => {
          if(selectedVariation.map(item => item.name).includes(c.name)){
                setActive(true)
          }
   }, [c, selectedVariation])
    
  return (
    <span  className={ active ? "active" : ""} title={c.name} style={{ background: `${c.name}`}}  onClick={() => setActive(!active)}></span>
  )
}

export default ScMoja