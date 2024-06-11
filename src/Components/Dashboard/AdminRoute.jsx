import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useAdmin } from '../Hooks/useAdmin';
// import { AuthContext } from '../../Provider/AuthProvider';

const AdminRoute = ({children}) => {

    const {user,loading}=useAuth()
    // const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin()

    const location=useLocation()

    if(loading || isAdminLoading){
        return <p>Loading .....</p>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace ></Navigate>;
    
};

export default AdminRoute;