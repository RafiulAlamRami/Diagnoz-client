import React, { useContext, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Providerr/AuthProviderr';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Navigate, useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_IMBB_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UserHome = () => {
    const { user } = useAuth()
    const [update, setUpdate] = useState()
    const [img, setImg] = useState()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const axiosPublic = useAxiosPublic()

    const { updateUserProfile } = useContext(AuthContext)

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`)
            return res.data
        }
    })


    const { data: upazila = [] } = useQuery({
        queryKey: ["upazila"],
        queryFn: async () => {
            const res = await axiosSecure.get('/upazila-user')
            return res.data
        }
    })

    const { data: district = [] } = useQuery({
        queryKey: ["district"],
        queryFn: async () => {
            const res = await axiosSecure.get('/district-user')
            return res.data
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log("Data", data)
        console.log(users);

        // image upload to imagebb
        const imageFile = { image: data?.image[0] }
        console.log(imageFile);
        if(imageFile.image!==undefined){
            console.log('here');
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            })
            setImg(res?.data?.data?.display_url)
            console.log(res.data);
        }
        else{
            //
            console.log('ffffffffff');
        }

        console.log('jjjjjjjj');

        updateUserProfile(data?.name || users.name, img || user.photoURL)
            .then(() => {
                console.log("Profile Updated");

                // user add in database
                const userInfo = {
                    name: data.name || users.name,
                    district: data.district || users.district,
                    upazila: data.upazila || users.upazila,
                    bloodGroup: data.bloodGroup || users.bloodGroup,
                    image: img||user.photoURL,
                    email: user.email

                }
                axiosSecure.patch('/up-user', userInfo)
                    .then(res => {
                        console.log("from response : ", res);
                        refetch()
                        setUpdate('Update successfull')
                        if (res.data.insertedId) {
                            console.log("user added in database successfully.");

                            // navigate('/')
                            reset()

                        }
                    })
            })
            .catch((erro) => {
                // An error occurred
                // ...
                console.log("errrrrrrrrrrrrrrrrrrrrrr");
            })


    }


    return (
        <div>
            <div>
                <h2>
                    <span>Hi ,Welcome </span>
                    {
                        user?.displayName ? user?.displayName : 'Back'
                    }
                </h2>
            </div>

            <div className='border-2'>
                <div className='border-2 my-5'>
                    <div className='flex justify-center mt-5 mb-4'>
                        <img className='h-[150px] rounded-lg' src={user.photoURL} alt="" />
                    </div>
                    <div className='my-2'>
                        <p>Name : {user.displayName}</p>
                    </div>
                    <div className='my-2'>
                        <p>Blood Group : {users.bloodGroup}</p>
                    </div>
                    <div className='my-2'>
                        <p>Address : </p>
                        <div className='flex justify-center gap-5'>
                            <p>Upazila : {users.upazila}</p>
                            <p>District : {users.district}</p>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p>Email : {users.email}</p>
                    </div>


                    <div className=" gap-[1.5em]" >
                        <button className={`text-white font-work text-[1em] font-semibold btn bg-[#50B1C9] hover:bg-[#50B1C9] `} onClick={() => document.getElementById('my_modal_5').showModal()}>Edit Profile</button>
                        {/* <p>{test.slot < 1 ? 'You cannot Book now because no more slot availabe' : ''}</p> */}
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">


                                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input type="text" {...register("name")} placeholder="Name" className="input input-bordered" />

                                        </div>

                                        <div className='w-full'>
                                            <label className='label'>Blood Group</label>
                                            <select defaultValue='' {...register("bloodGroup")} className=" select select-bordered w-full">
                                                <option disabled value=''>Select blood group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O">O+</option>
                                                <option value="AO-">O-</option>

                                            </select>
                                        </div>


                                        <div className='flex gap-5'>
                                            <div className='w-1/2'>
                                                <label className='label'>District</label>
                                                <select {...register("district")} className=' select select-bordered w-full' defaultValue={''}>
                                                    <option disabled value=''>Select District</option>
                                                    {district?.map((upazila) => (
                                                        <option className='h-[100px]' key={upazila.id} value={upazila.name}>
                                                            {upazila.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='w-1/2'>
                                                <label className='label'>Upazila</label>
                                                <select {...register("upazila")} className=' select select-bordered w-full' defaultValue={''}>
                                                    <option disabled value=''>Select upazila</option>
                                                    {upazila?.map((upazila) => (
                                                        <option className='h-[100px]' key={upazila.id} value={upazila.name}>
                                                            {upazila.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>

                                        <div>
                                            <label className='label mt-3'>Photo</label>
                                            <input type="file" className="file-input file-input-bordered w-full"  {...register("image")} />
                                        </div>


                                        <button className="btn btn-primary">Update Now</button>






                                    </form>


                                </div>

                                {update && `${update}`}


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
    );
};

export default UserHome;