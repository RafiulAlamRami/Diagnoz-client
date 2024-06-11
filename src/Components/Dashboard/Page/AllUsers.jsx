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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    return (
        <div>
            <div className='mb-10'>
                <p className='text-2xl'>All Users</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
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

                                    <select defaultValue='default' {...register("bloodGroup", { required: true })} className=" select select-bordered w-24">
                                        <option disabled value='default'>Status</option>
                                        <option value="active">Active</option>
                                        <option value="blocked">Blocked</option>
                                    </select>

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