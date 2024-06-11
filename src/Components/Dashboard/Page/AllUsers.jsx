import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
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


    return (
        <div>
            <div className='mb-10'>
                <p className='text-2xl'>All Users</p>
            </div>

            <div className="">
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
                        {users.map((user, index) =>
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
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                            <li onClick={()=>handleActive(user)}><a>Active</a></li>
                                            <li onClick={()=>handleBlock(user)}><a>Block</a></li>
                                        </ul>
                                    </div>


                                </td>
                                <td>
                                    <button className='btn'>see info</button>
                                </td>
                                <td>
                                    <button className='btn'>Download details</button>
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