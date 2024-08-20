/* eslint-disable react/prop-types */
import { useState } from "react"

const SMoja = ({ c}) => {
    const [active, setActive] = useState(false);
   const handleClick = () => {
          setActive(!active);
   }
  return (
    <span className={active ? "active" : ""} title={c.name} onClick={handleClick}>{c.name}</span>
  )
}

export default SMoja