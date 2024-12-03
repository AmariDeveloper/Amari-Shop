import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
      const cookie = document.cookie.split(';').some(item => item.startsWith("mimic"));
     return (
              cookie ? <Outlet /> :   <Navigate to={'/auth/login'} />
     )
}

export default ProtectedRoutes