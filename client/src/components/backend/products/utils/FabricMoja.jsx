/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const FabricMoja = ({ c}) => {
    const [active, setActive] = useState(false)
    const { selectedVariation } = useSelector(state => state.productUtils);

    useEffect(() => {
         if(selectedVariation.map(item => item.name).includes(c.name)){
              setActive(true)
         }
    }, [c, selectedVariation])
  return (
      <img className={active ? "active": ""} src={c.name} alt="fabric" onClick={() => setActive(!active)} />
  )
}

export default FabricMoja