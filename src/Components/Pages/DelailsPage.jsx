import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { loadStripe } from '@stripe/stripe-js';
// import CheckOutForm from '../Payment/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { CheckOutForm } from '../Payment/CheckOutForm';
import useAuth from '../Hooks/useAuth';
import useActive from '../Hooks/useActive';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK);

const DelailsPage = () => {

    const axiosSecure=useAxiosSecure()

    const auth = useAuth()
    // console.log(auth.user);
    const { user, status } = auth

    const axiosPublic = useAxiosPublic()

    const { id } = useParams()
    // console.log(id);

    const active=useActive()

    

    const { data: test = [], refetch } = useQuery({
        queryKey: ["test", id],
        queryFn: async () => {
            const res = await axiosSecure(`/test-details/${id}`)
            return res.data
        }
    })
    console.log(test);

    // const [isActive,setIsActive]=useState()

    // useEffect(()=>{
    //     if (status==='active') {
    //         setIsActive(true)
    //     }
    //     else{
    //         setIsActive(false)
    //     }
    // },[status])
    if (!active) {
        return  <div>
        <p className='text-red-600 my-10'>You are Blocked by Admin please contact !!!</p>
        
       </div>
    }

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



                                {/* <div className=" gap-[1.5em]" >
                                    <button className={`text-white font-work text-[1em] font-semibold btn bg-[#50B1C9] hover:bg-[#50B1C9] ${test.slot < 1 || !isActive ? 'btn-disabled' : ''} `} onClick={() => document.getElementById('my_modal_5').showModal()}>Book Now</button>
                                    <p className='text-red-600'>{test.slot < 1 ? 'You cannot Book now because no more slot availabe' : ''}</p>
                                    <p className='text-red-600'>{!isActive ? 'Sorry!! you can not book any test and can not vist your Dashboard.You can contact us.Thankyou ':''}</p>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <Elements stripe={stripePromise}>
                                                <CheckOutForm price={test.price} id={test._id} date={test.date} month={test.month} year={test.year} testName={test.name}></CheckOutForm>
                                            </Elements>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    
                                                    <button className={`btn hover:bg-green-500 hover:text-white`}>Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div> */}

                                <div className=" gap-[1.5em]" >
                                    <button className={`text-white font-work text-[1em] font-semibold btn bg-[#50B1C9] hover:bg-[#50B1C9] ${test.slot < 1 ? 'btn-disabled' : ''} `} onClick={() => document.getElementById('my_modal_5').showModal()}>Book Now</button>
                                    <p className='text-red-600'>{test.slot < 1 ? 'You cannot Book now because no more slot availabe' : ''}</p>

                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <Elements stripe={stripePromise}>
                                                <CheckOutForm price={test.price} id={test._id} date={test.date} month={test.month} year={test.year} testName={test.name}></CheckOutForm>
                                            </Elements>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className={`btn hover:bg-green-500 hover:text-white`}>Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DelailsPage;