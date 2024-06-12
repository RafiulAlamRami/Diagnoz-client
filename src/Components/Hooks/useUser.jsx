import axios from 'axios';
import React, { useState } from 'react';
import useAuth from './useAuth';

const useUser = () => {

    const {user}=useAuth()
    console.log(user);
    const [st,setStatus]=useState([])
    axios.get(`https://diagnoz-server.vercel.app/user/${user?.email}`)
                .then(res=>{
                    // console.log(res.data.status);
                    setStatus(res.data.status)
                })
    return [st];
};

export default useUser;