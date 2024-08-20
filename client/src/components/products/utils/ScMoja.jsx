/* eslint-disable react/prop-types */
import { useState } from "react"

const ScMoja = ( { c }) => {
    const [active, setActive] = useState(false)
    
  return (
    <span  className={ active ? "active" : ""} title={c.name} style={{ background: `${c.name}`}}  onClick={() => setActive(!active)}></span>
  )
}

export default ScMoja