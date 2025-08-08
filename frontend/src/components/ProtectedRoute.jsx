import { useSelector } from "react-redux"
import { authState } from "../store/slice/authSlice"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated} = useSelector(authState);

    if(isAuthenticated)
        return children;
    
    return <Navigate to ="/login" replace/>
}
export default ProtectedRoute;