import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { jsPDF } from "jspdf";
import Emergency from '../../Pages/Emergency ';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const [userDatas, setUserDatas] = useState()

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users-dash"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })


    const handleMakeAdmin = (user) => {

        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now.`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })
    }

    const handleActive = (user) => {
        console.log(user._id);
        axiosSecure.patch(`/user-active/${user._id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                // if (res.data.modifiedCount > 0) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${user.name} is ${user.status} now.`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });

                // }
                // else{
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${user.name} is already ${user.status}.`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                // }

            })
    }

    const handleBlock = (user) => {
        console.log(user._id);
        axiosSecure.patch(`/user-block/${user._id}`)
            .then(res => {
                console.log(res.data);
                refetch()
                // if (res.data.modifiedCount > 0) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${user.name} is ${user.status} now.`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });

                // }
                // else{
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${user.name} is already ${user.status}.`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                // }

            })
    }


    const handleDownload = (user) => {

        console.log('helo', user.email);

        axiosSecure.get(`/payment-test/${user.email}`)
            .then(res => {
                console.log(res.data);
                return setUserDatas(res.data)
            })

        const doc = new jsPDF();
        console.log(userDatas);
        doc.text(`All Information abouth of ${user.name}

                   Emai: ${user.email}
                   Total tests:${userDatas?.length || 0}

                        ${userDatas?.map((userData, index) => `${index + 1} . Test Name:  ${userData.testName}
                        Transaction Id : ${userData.transactionI}
                        delivery report : ${userData.status}

                        ${ <Emergency></Emergency> }
                                                                                
                        `)}`, 10, 10);
        doc.save("a4.pdf");

    }

    const [info, setInfo] = useState()

    const handleInfo = (user) => {

        axiosSecure.get(`/user/${user.email}`)
            .then(res => {
                console.log(res.data);
                setInfo(res.data)
            })

    }


    return (
        <div>
            <div className='mb-10'>
                <p className='text-2xl'>All Users</p>
            </div>

            <div className=" ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Info</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users?.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? "Admin" :

                                            <div className="tooltip tooltip-success" data-tip="Click here to Make Admin">
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-md text-xl bg-orange-500 text-white"><HiUserGroup /></button>
                                            </div>
                                    }
                                </td>
                                <td>

                                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                                        <select defaultValue='default' {...register("bloodGroup", { required: true })} className=" select select-bordered w-24">
                                            <option disabled value='default'>{user.status}</option>
                                            <option value="active">Active</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </form> */}


                                    <div className="dropdown dropdown-hover">
                                        <div tabIndex={0} role="button" className="btn m-1 capitalize">{user.status}</div>
                                        <ul tabIndex={0} className="border-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                            <li onClick={() => handleActive(user)}><a>Active</a></li>
                                            <li onClick={() => handleBlock(user)}><a>Block</a></li>
                                        </ul>
                                    </div>


                                </td>
                                <td>
                                    {/* <button className='btn' onClick={() => { handleInfo(user) }}>see info</button> */}
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="" onClick={() => { handleInfo(user) }}><span className='btn' onClick={() => document.getElementById('my_modal_5').showModal()}>See Info</span> </button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <div>
                                                <div className='flex justify-center mt-5 mb-4'>
                                                    <img className='h-[150px] rounded-lg' src={info?.image} alt="" />
                                                </div>
                                                <div className='my-2 text-center'>
                                                    <p>Name : {info?.name}</p>
                                                </div>
                                                <div className='my-2 text-center'>
                                                    <p>Blood Group : {info?.bloodGroup}</p>
                                                </div>
                                                <div className='my-2'>
                                                    <p className='text-center'>Address : </p>
                                                    <div className='flex justify-center gap-5'>
                                                        <p>Upazila : {info?.upazila}</p>
                                                        <p>District : {info?.district}</p>
                                                    </div>
                                                </div>
                                                <div className='my-2 text-center'>
                                                    <p>Email : {info?.email}</p>
                                                </div>
                                            </div>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    <button className='btn' onClick={() => handleDownload(user)}>Download details</button>
                                </td>
                            </tr>
                        )}
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;