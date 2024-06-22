import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

const AllBanner = () => {
    const axiosSecure = useAxiosSecure()

    const { data: banners = [], refetch } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const res = await axiosSecure.get('/banner')
            return res.data
        }
    })

    const handleActive = (banner) => {
        console.log(banner._id);
        axiosSecure.patch(`/banner-active/${banner._id}`)
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
        axiosSecure.patch(`/banner-block/${user._id}`)
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

    const handleDeleteBanner=(banner)=>{
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



                axiosSecure.delete(`banner/${banner._id}`)
                    .then(res => {
                        // console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
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
                    <p className='text-2xl'>All Banners</p>
                </div>

                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Banner Name</th>
                                <th>Image</th>
                                <th>Coupon</th>
                                <th>Coupon Rate</th>
                                <th>Action</th>
                                <th>is Active</th>
                                {/* <th>Details</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {banners.map((banner, index) =>
                                <tr key={banner._id}>
                                    <th>{index + 1}</th>
                                    <td>{banner.name}</td>
                                    <td>
                                        <div className=" w-16 h-16">
                                            <img src={banner.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </td>

                                    <td>{banner.coupon}</td>
                                    <td>{banner.couponRate}%</td>
                                    <td>
                                    <button onClick={() => handleDeleteBanner(banner)} className="btn btn-ghost btn-md text-2xl text-red-600"><MdDeleteForever /></button>
                                </td>

                                    <td>

                                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                                        <select defaultValue='default' {...register("bloodGroup", { required: true })} className=" select select-bordered w-24">
                                            <option disabled value='default'>{user.status}</option>
                                            <option value="active">Active</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </form> */}


                                        <div className="dropdown dropdown-hover ">
                                            <div tabIndex={0} role="button" className="btn m-1 capitalize ">{`${banner.isActive}`}</div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box border-2">
                                                <li onClick={() => handleActive(banner)}><a>True</a></li>
                                                {/* <li onClick={() => handleBlock(banner)}><a>False</a></li> */}
                                            </ul>
                                        </div>


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

export default AllBanner;