import { Outlet,Navigate, useNavigate } from "react-router-dom";
import {  useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../redux/slices/userSlice";
import { clearCredentials, clearUserProfile } from "../redux/slices/authSlice";
import { useCallback, useEffect } from "react";

const ProtectedRoutes = () => {
      const { userInfo } = useSelector(state => state.auth);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const cookie = document.cookie.split(';').some(item => item.startsWith("mimic"));
      const [ Logout ] = useLogoutUserMutation();

       const handleLogout = useCallback(() => {
            dispatch(clearCredentials());
            dispatch(clearUserProfile());
            Logout();
            navigate("/auth/login")
       }, [dispatch, Logout, navigate])
      
       useEffect(() => {
              if(!cookie){
                    handleLogout();
              }
       }, [cookie, handleLogout])
     return (
              userInfo !== null && cookie ? <Outlet /> :   <Navigate to={'/auth/login'} />
     )
}

export default ProtectedRoutes