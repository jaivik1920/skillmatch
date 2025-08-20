import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated} = useSelector(state => state.auth);

    if(isAuthenticated)
        return children;
    
    return <Navigate to ="/login" replace/>
}
export default ProtectedRoute;