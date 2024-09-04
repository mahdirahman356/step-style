import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'; 
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    let {user, loading} = useContext(AuthContext)
    let [isAdmin, isAdminLoading] = useAdmin()
    let location = useLocation();
    if(loading || isAdminLoading){
        return <div className="h-[80vh] flex justify-center items-center"> <span className="loading loading-spinner loading-lg"></span></div>
      }
    if(user && isAdmin){
        return children
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

AdminRoute.propTypes ={
    children: PropTypes.node.isRequired
}

export default AdminRoute;