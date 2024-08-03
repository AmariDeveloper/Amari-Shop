import { Outlet,Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const ProtectedRoutes = () => {
      const { userInfo } = useSelector(state => state.auth);
     return (
              userInfo !== null ? <Outlet /> :   <Navigate to={'/auth/login'} />
     )
}

export default ProtectedRoutes