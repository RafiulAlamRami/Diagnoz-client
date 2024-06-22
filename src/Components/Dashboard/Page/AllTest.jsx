import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { GrTestDesktop } from 'react-icons/gr';
import DatePicker from "react-datepicker";


const AllTest = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    // const [selectedDate, setSelectedDate] = useState(null);




    const { data: tests={}, refetch } = useQuery({
        queryKey: ["tests-admin"],
        queryFn: async () => {
            const res = await axiosSecure.get('/alltest')
            return res.data
        }
    })

    console.log(typeof tests);







    const handleDeleteTest = (test) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {



                axiosSecure.delete(`/test/${test._id}`)
                    .then(res => {
                        // console.log(res);
                        // refetch()
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${test.name} has been Canceled.`,
                                icon: "success"

                            });
                        }
                    })

            }

        });

    }



    return (
        <div>
            <p className='my-5 text-2xl font-bold'> All tests </p>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Test Name</th>
                                <th>Image</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Reservations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {tests.length>0 && tests?.map((test, index) =>
                                <tr key={test._id}>
                                    <th>{index + 1}</th>
                                    <td>{test.name}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={test.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>

                                        {/* The button to open modal */}
                                        <Link to={`/dashboard/updateTest/${test._id}`}> <button className='btn text-xl bg-orange-500 text-white '><MdEditDocument /></button> </Link>


                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteTest(test)} className="btn btn-ghost btn-md text-2xl text-red-600"><MdDeleteForever /></button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/reservation/${test._id}`}><button className='btn'>See reservations</button></Link>
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
        </div>
    );
};

export default AllTest;