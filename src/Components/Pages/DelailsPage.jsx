import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { loadStripe } from '@stripe/stripe-js';
// import CheckOutForm from '../Payment/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { CheckOutForm } from '../Payment/CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK);

const DelailsPage = () => {

    const axiosPublic = useAxiosPublic()

    const { id } = useParams()
    // console.log(id);

    const { data: test = [], refetch } = useQuery({
        queryKey: ["test", id],
        queryFn: async () => {
            const res = await axiosPublic(`/test-details/${id}`)
            return res.data
        }
    })
    console.log(test);


    return (

        <div>
            <div className="">
                <div className="mb-[10em] mt-[4em]">
                    <div className=" grid grid-cols-1 md:flex md:gap-2 lg:flex lg:gap-[3em]">
                        <div className="w-full md:w-[40%} lg:w-[40%] border flex justify-center items-center bg-[#1313130c] rounded-xl ">
                            <img src={`${test.image}`} alt="" className="min-h-full min-w-full py-[5em]" />
                        </div>
                        <div className="w-[60%] book-detailes-content">
                            <div className="p-[]">
                                <p className="font-play text-[2rem] font-bold text-[#131313] pb-[.4em]">{test.name}</p>
                                <p className="font-work text-[1.5rem] font-semibold text-[#131313cc] border-b-2 border-dashed pb-[1em]">Price : ${test.price}</p>
                                <p className="font-work font-semibold text-[1.7rem] text-[#131313cc] py-[1em] border-b-2 border-dashed ">Available Slot : {test.slot}</p>
                                <p className="font-work font-semibold text-[1rem] text-[#131313cc] py-[1em] border-b-2 border-dashed"> {test.shortDes}</p>
                                <p className="font-work font-semibold text-[1.2rem] text-[#131313cc] py-[1em] border-b-2 border-dashed mb-5"> {test.longDes}</p>



                                
                                {/* Open the modal using document.getElementById('ID').showModal() method */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DelailsPage;