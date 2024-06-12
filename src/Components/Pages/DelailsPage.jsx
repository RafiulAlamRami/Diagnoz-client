import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const DelailsPage = () => {

    const axiosPublic=useAxiosPublic()

    const {id}=useParams()
    // console.log(id);

    const { data: test = [], refetch } = useQuery({
        queryKey: ["test",id],
        queryFn: async () => {
            const res = await axiosPublic(`/test-details/${id}`)
            return res.data
        }
    })
    console.log(test);
    return (
        
        <div>
            detailsssssss
        </div>
    );
};

export default DelailsPage;