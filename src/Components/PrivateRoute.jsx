import React, { Children, useContext } from 'react';
// import { AuthContext } from '../Provider/AuthProvider';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providerr/AuthProviderr';
import useActive from './Hooks/useActive';

const PrivateRoute = ({children}) => {

    const {user,loading}=useContext(AuthContext)
    const location=useLocation()

    const active=useActive()

    if(loading){
        return <p>Loading .....</p>
    }

    // if (!active) {
    //     return  <div>
    //     <p className='text-red-600 my-10'>You are Blocked by Admin please contact !!!</p>
    //    </div>
    // }

    if(user){
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>;
};

export default PrivateRoute;