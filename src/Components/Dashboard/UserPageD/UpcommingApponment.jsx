import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { MdCancel } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const UpcommingApponment = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const {user}=useAuth()

    const { data: tests = [], refetch } = useQuery({
        queryKey: ["tests-appoinment"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-test-up/${user.email}`)
            return res.data
        }
    })

    console.log(user.email);


    const handleCancel=(test)=>{
        console.log(test);
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



                axiosSecure.delete(`/payment-trId/${test.transactionId}`)
                    .then(res => {
                        // console.log(res);
                        if (res.data.deletedCount > 0) {
                            axiosSecure.patch(`/test-slot-cancel/${test.testId}`)
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

    return (
        <div>
            <div>
                <div className='mb-10'>
                    <p className='text-2xl'>All Tests</p>
                </div>

                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Test Name</th>
                                <th>Appoinment Date</th>
                                <th>TransactionId</th>
                                
                                <th>Action</th>
                                
                                {/* <th>Details</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {tests.map((test, index) =>
                                <tr key={test._id}>
                                    <th>{index + 1}</th>
                                    <td>{test.testName}</td>

                                    <td>{test.date}-{test.month}-{test.year}</td>
                                    <td>{test.transactionId}</td>
                                    <td>
                                        <button onClick={() => handleCancel(test)} className="btn btn-ghost btn-md text-lg text-red-600"><MdCancel /> Cancel</button>
                                    </td>

                                    <td>

                                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                                        <select defaultValue='default' {...register("bloodGroup", { required: true })} className=" select select-bordered w-24">
                                            <option disabled value='default'>{user.status}</option>
                                            <option value="active">Active</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </form> */}


                                        {/* <div className="dropdown dropdown-hover ">
                                            <div tabIndex={0} role="button" className="btn m-1 capitalize ">{`${banner.isActive}`}</div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box border-2">
                                                <li onClick={() => handleActive(banner)}><a>True</a></li>
                                                <li onClick={() => handleBlock(banner)}><a>False</a></li>
                                            </ul>
                                        </div> */}


                                    </td>

                                    {/* <td>
                                        <button className='btn'>see info</button>
                                    </td>
                                    <td>
                                        <button className='btn'>Download details</button>
                                    </td> */}
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
        </div>
    );
};

export default UpcommingApponment;