import React, { useContext } from 'react';
import { AuthContext } from '../../Providerr/AuthProviderr';


const useAuth = () => {

    const auth=useContext(AuthContext)
    return auth;

    // const uauth=useContext(AuthContext)
    // const a=true
    // return {uauth,a}
};

export default useAuth;