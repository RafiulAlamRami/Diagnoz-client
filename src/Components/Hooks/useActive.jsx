import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useActive = () => {
    const [isActive, setIsActive] = useState()
    const [status, setStatus] = useState()
    const { user } = useAuth()
    const axiosPublic=useAxiosPublic()
    // const Navigate=useNavigate()

    // const token=localStorage.getItem('access-token')


    // axios.get(`https://diagnoz-server.vercel.app/user/${user?.email}`)
    //     .then(res => {
    //         // console.log(res.data.status);
    //         console.log(res.data.status);
    //         setStatus(res.data.status)
    //     })

    const {data}=useQuery({
        queryKey:["data"],
        queryFn:async ()=>{
            const res=await axiosPublic.get(`https://diagnoz-server.vercel.app/user/${user?.email}`)
            console.log(res.data.status);
            return res.data.status
        }
    })

console.log(status);

    useEffect(() => {
        if (data === 'active') {
            setIsActive(true)
        }
        else {
            setIsActive(false)
        }
    }, [data])  

    console.log(isActive);

    if (!isActive) {
       return false
    }

    return  true
};

export default useActive;