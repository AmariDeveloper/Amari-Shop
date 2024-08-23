import { useEffect, useState } from "react"
import { sidebarContext } from "../../../lib/sidebarcontext"
import Sidebar from "../../../components/backend/common/Sidebar"
import VariationsBody from "../../../components/backend/products/variations/VariationsBody"
import { useGetAllVariationsQuery } from "../../../redux/slices/productSlice"
import { useDispatch } from "react-redux"
import { setVariations } from "../../../redux/slices/utilSlice"

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