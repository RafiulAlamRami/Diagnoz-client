
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { HiUserGroup } from 'react-icons/hi';
import { TbFileReport } from 'react-icons/tb';

const Reservation = () => {

    const { id } = useParams()
    console.log(id);
    const { loading } = useAuth()
    const [search, setSearch] = useState()

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    console.log('ok');
    const { data: reservetions = [], refetch } = useQuery({
        queryKey: ["reservetions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-reservetion-for-a-test/${id}`)
            console.log('from inside');
            console.log(res.data);
            return res.data
        }
    })

    const { data: tests = [] } = useQuery({
        queryKey: ["reswevation-test"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/test-allTest/${id}`)
            return res.data
        }
    })

    console.log(reservetions[0]?.transactionId);
    // console.log(tests?.name);

    const handleCancel = (id, testId) => {
        console.log(id);
        console.log(testId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {



                axiosSecure.delete(`/paymen-reservetion/${id}`)
                    .then(res => {
                        // console.log(res);
                        if (res.data.deletedCount > 0) {
                            //
                            
                            axiosSecure.patch(`/test-slot-cancel/${testId}`)
                                .then(res => {
                                    console.log("meeeeeeeeee slot cancel");
                                })
                            // 
                            refetch()
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your appoinment has been Canceled.",
                                icon: "success"

                            });
                        }
                    })

            }

        });
    }


    const handleDelivery = (e, testId, trId, email) => {

        // console.log('i am e     :', e.target.report.value);

        const report = e.target.report.value

        e.preventDefault()
        console.log(testId, trId, email);

        axiosSecure.patch(`/delivery-report/${testId}/${trId}/${email}`, { report })
            .then(res => {
                console.log(res.data);
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Successfully deliverd.`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })

    }


    const handleSearch = (e) => {

        console.log('i am e     :', e.target.search.value, id);

        const email = e.target.search.value

        e.preventDefault()

        axiosSecure.get(`/payment-test-search/${id}/${email}`)
            .then(res => {
                console.log(res.data);
                setSearch(res.data)
                // refetch()

            })
    }


    return (
        <div>
            <div>
                <p className='text-2xl font-bold'>All reservetion of {tests.name} <br /> <span></span> </p>
            </div>

            <div className='flex justify-center my-10'>
                <div className='h-[250px]'>
                    <img className='h-full' src={tests.image} alt="" />
                </div>
            </div>
            <div className='my-10'>
                <form onSubmit={(e) => handleSearch(e)}>


                    <div className='flex flex-col gap-8 items-center'>
                        <div className='w-full'>
                            <label className='label mb-2' htmlFor="my_modal_6">Search</label>
                            <input type="text" name='search' placeholder="Search with user email" className="input input-bordered w-full" required />
                        </div>

                        <input type="submit" className='btn w-1/2' value="Search" />
                    </div>
                </form>
            </div>

            {/*  */}



            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>User email</th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Action</th>
                                <th>Status</th>
                                {/* <th>Favorite Color</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {

                                search ?
                                    <>
                                        {
                                            search?.map((reservetion, index) =>
                                                <tr key={reservetion._id}>
                                                    <th>{index + 1}</th>
                                                    <td>{reservetion.email}</td>
                                                    <td>{reservetion.transactionId}</td>

                                                    <td>{`${reservetion.date}-${reservetion.month}-${reservetion.year}`}</td>

                                                    <td>
                                                        {
                                                            reservetion.status === 'Delivered' ? <button className='btn btn-ghost btn-md text-lg' disabled><MdCancel />Cancel</button> :
                                                                <button onClick={() => handleCancel(reservetion._id,reservetion.testId)} className="btn btn-ghost btn-md text-lg text-red-600"><MdCancel /> Cancel</button>
                                                        }

                                                    </td>

                                                    <td>
                                                        {
                                                            reservetion.status === 'Delivered' ? <p className='text-lg font-semibold text-green-500'>Delivered</p> :

                                                                <>

                                                                    {/* The button to open modal */}
                                                                    <div className="tooltip tooltip-success" data-tip="Click here to send delivery report"> <label htmlFor={`x-${reservetion._id}`} className=" btn bg-orange-500 text-white">{reservetion.status}</label>
                                                                    </div>

                                                                    {/* Put this part before </body> tag */}
                                                                    <input type="checkbox" id={`x-${reservetion._id}`} className="modal-toggle" />
                                                                    <div className="modal" role="dialog">
                                                                        <div className="modal-box">
                                                                            <form onSubmit={(e) => handleDelivery(e, reservetion.testId, reservetion.transactionId, reservetion.email)}>

                                                                                {/* <button onClick={() => handleDelivery(reservetion._id)} className="btn btn-ghost btn-md text-lg bg-orange-500 text-white"> Send report</button> */}
                                                                                <div className='flex flex-col gap-8 items-center'>
                                                                                    <div className='w-full'>
                                                                                        <label className='label mb-2' htmlFor={`x-${reservetion._id}`}>Report Link (Google Docs link)</label>
                                                                                        <input type="text" name='report' placeholder="Type or paste here report link (Google Docs link)" className="input input-bordered w-full" required />
                                                                                    </div>

                                                                                    <input type="submit" className='btn w-1/2' value="Send report" />
                                                                                </div>
                                                                            </form>
                                                                            <div className="modal-action">
                                                                                <label htmlFor={`x-${reservetion._id}`} className="btn">Close!</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>



                                                                </>

                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                    </>
                                    :
                                    <>{
                                        reservetions?.map((reservetion, index) =>
                                            <tr key={reservetion._id}>
                                                <th>{index + 1}</th>
                                                <td>{reservetion.email}</td>
                                                <td>{reservetion.transactionId}</td>

                                                <td>{`${reservetion.date}-${reservetion.month}-${reservetion.year}`}</td>

                                                <td>
                                                    {
                                                        reservetion.status === 'Delivered' ? <button className='btn btn-ghost btn-md text-lg' disabled><MdCancel />Cancel</button> :
                                                            <button onClick={() => handleCancel(reservetion._id,reservetion.testId)} className="btn btn-ghost btn-md text-lg text-red-600"><MdCancel /> Cancel</button>
                                                    }

                                                </td>

                                                <td>
                                                    {
                                                        reservetion.status === 'Delivered' ? <p className='text-lg font-semibold text-green-500'>Delivered</p> :

                                                            <>

                                                                {/* The button to open modal */}
                                                                <div className="tooltip tooltip-success" data-tip="Click here to send delivery report"> <label htmlFor={`x-${reservetion._id}`} className=" btn bg-orange-500 text-white">{reservetion.status}</label>
                                                                </div>

                                                                {/* Put this part before </body> tag */}
                                                                <input type="checkbox" id={`x-${reservetion._id}`} className="modal-toggle" />
                                                                <div className="modal" role="dialog">
                                                                    <div className="modal-box">
                                                                        <form onSubmit={(e) => handleDelivery(e, reservetion.testId, reservetion.transactionId, reservetion.email)}>

                                                                            {/* <button onClick={() => handleDelivery(reservetion._id)} className="btn btn-ghost btn-md text-lg bg-orange-500 text-white"> Send report</button> */}
                                                                            <div className='flex flex-col gap-8 items-center'>
                                                                                <div className='w-full'>
                                                                                    <label className='label mb-2' htmlFor={`x-${reservetion._id}`}>Report Link (Google Docs link)</label>
                                                                                    <input type="text" name='report' placeholder="Type or paste here report link (Google Docs link)" className="input input-bordered w-full" required />
                                                                                </div>

                                                                                <input type="submit" className='btn w-1/2' value="Send report" />
                                                                            </div>
                                                                        </form>
                                                                        <div className="modal-action">
                                                                            <label htmlFor={`x-${reservetion._id}`} className="btn">Close!</label>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                            </>

                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </>

                            }


                        </tbody>
                    </table>
                </div>
            </div>




        </div>
    );
};

export default Reservation;


//---------------------------------------


