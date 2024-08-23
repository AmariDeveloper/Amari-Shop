/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const SMoja = ({ c}) => {
    const [active, setActive] = useState(false);
    const { selectedVariation } = useSelector(state => state.productUtils);

    useEffect(() => {
             if(selectedVariation.map(item => item.name).includes(c.name)){
                  setActive(true)
             }
    }, [c, selectedVariation])
   const handleClick = () => {
          setActive(!active);
   }
  return (
    <span className={active ? "active" : ""} title={c.name} onClick={handleClick}>{c.name}</span>
  )
}

export default SMoja