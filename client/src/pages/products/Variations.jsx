import { useEffect, useState } from "react"
import { sidebarContext } from "../../lib/sidebarcontext"
import Sidebar from "../../components/common/Sidebar"
import VariationsBody from "../../components/products/variations/VariationsBody"
import { useGetAllVariationsQuery } from "../../redux/slices/productSlice"
import { useDispatch } from "react-redux"
import { setVariations } from "../../redux/slices/utilSlice"

const Variations = () => {
    const [status, setStatus ] = useState(false)
    const { data } = useGetAllVariationsQuery({ refetchOnMountOrArgChange: true });
    const dispatch = useDispatch();

    useEffect(() => {
         if(data) dispatch(setVariations([...data.variations]))
    }, [data, dispatch])

  return (
    <sidebarContext.Provider  value={[status, setStatus]}>
                <Sidebar />
                <VariationsBody />
    </sidebarContext.Provider>
  )
}

export default Variations