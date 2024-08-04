import { GoCheckCircleFill } from "react-icons/go";
import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux";
import { removeAppNotification } from "../../redux/slices/utilSlice";
import { useEffect } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";
const AppNotification = () => {
  const {  appNotification } = useSelector(state => state.utils);
  const dispatch = useDispatch();
  //console.log(appNotification)

  const closeNotificationPop = () => {
         dispatch(removeAppNotification())
  }

  useEffect(() => {
         if(appNotification.status){
             setTimeout(() => {
                   dispatch(removeAppNotification());
             }, 5000)
         }
  }, [dispatch, appNotification])

  return (
    <div className={ appNotification.status ? `notification-pop active ${appNotification.type}` : `notification-pop ${appNotification.type}`}>
              <span className="close-pop" onClick={closeNotificationPop}><CgClose /></span>
            <div className="notification-icon-wrap">
                      { appNotification.type === "Success" ?
                              <span><GoCheckCircleFill /></span>  :
                          appNotification.type === "Error" ?
                              <span><BiSolidErrorCircle /></span> :
                            <span><GoAlertFill /></span>
                       }
                     
            </div>
            <div className="notification-message">
                      <h4>{appNotification.type}</h4>
                      <p>{appNotification.message}</p>
            </div>
    </div>
  )
}

export default AppNotification;