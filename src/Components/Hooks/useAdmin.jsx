import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const useAdmin = () => {
    const {user,loading}=useAuth()
    // console.log(user.email);
    const axiosSecure=useAxiosSecure()
    const token=localStorage.getItem('access-token')

    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!loading&& !!user?.email && !!token,
        queryFn:async ()=>{
            const res=await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    
    return [isAdmin,isAdminLoading];
};

// export default useAdmin;