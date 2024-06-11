import React, { Children, useContext } from 'react';
// import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providerr/AuthProviderr';

const PrivateRoute = ({children}) => {

    const {user,loading}=useContext(AuthContext)
    const location=useLocation()

    if(loading){
        return <p>Loading .....</p>
    }

    if(user){
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>;
};

export default PrivateRoute;