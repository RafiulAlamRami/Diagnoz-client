import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providerr/AuthProviderr';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

// imagebb
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_IMBB_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {

    const navigate = useNavigate()

    const [confirm, setConfirm] = useState(false)



    const axiosPublic = useAxiosPublic()

    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log("Data", data)

        if (data.password !== data.confirmPassword) {
            return setConfirm(true)
        }
        else {
            setConfirm(false)
        }

        // image upload to imagebb
        const imageFile = { image: data?.image[0] }
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        })

        console.log(res.data);

        if (res.data.success) {
            createUser(data.email, data.password)
                .then(user => {
                    const result = user.user
                    console.log("User result", result);

                    updateUserProfile(data?.name, res?.data?.data?.display_url)
                        .then(() => {
                            console.log("Profile Updated");

                            // user add in database
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                status:'active',
                                district: data.district,
                                upazila: data.upazila,
                                bloodGroup: data.bloodGroup,

                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log("from response : ", res);
                                    if (res.data.insertedId) {
                                        console.log("user added in database successfully.");
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Successfully Register",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/')
                                        reset()
                                    }
                                })
                        })
                        .catch((erro) => {
                            // An error occurred
                            // ...
                        })
                })
                .catch(error => {
                    console.log(error);
                    alert("something wrong : see error message in console ")
                })
        }


    }

    const handleGoogleSignIn = () => {

        googleSignIn()
            .then(result => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Successfully Register.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                const user = result.user
                console.log(user);
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    status:'active',
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("user added in database");
                        }
                        else {
                            console.log(res.data);
                        }
                    })
                navigate('/dashboard/userHome');
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }


    const { data: upazila = [] } = useQuery({
        queryKey: ["upazila"],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazila')
            return res.data
        }
    })

    const { data: district = [] } = useQuery({
        queryKey: ["district"],
        queryFn: async () => {
            const res = await axiosPublic.get('/district')
            return res.data
        }
    })

    return (
        <div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-9">Register now!</h1>
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600 mt-2'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600 mt-2'>Email is required</span>}
                            </div>

                            <div className='w-full'>
                                <label className='label'>Blood Group</label>
                                <select defaultValue='default' {...register("bloodGroup", { required: true })} className=" select select-bordered w-full">
                                    <option disabled value='default'>Select blood group</option>
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
                                <div>
                                    <label className='label'>District</label>
                                    <select {...register("district", { required: true })} className=' select select-bordered w-full'>
                                        {district?.map((upazila) => (
                                            <option className='h-[100px]' key={upazila.id} value={upazila.name}>
                                                {upazila.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='label'>Upazila</label>
                                    <select {...register("upazila", { required: true })} className=' select select-bordered w-full'>
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
                                <input type="file" className="file-input file-input-bordered w-full"  {...register("image", { required: true })} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 13, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,13}$/ })} placeholder="password" className="input input-bordered" />
                                {/* {errors.password && <span className='text-red-600 mt-2'>Password is required</span>} */}
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600'>Passord must be 6 characters </p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600'>Passord must be maximum 13 characters </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600'>Passord must have 1 uppercase latter 1 lowercase latter 1 digit 1 special character </p>
                                )}
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>


                            <div>
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="Confirm password" className="input input-bordered  w-full"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <br />
                                {confirm && <p className='text-red-600'>Password didnt match</p>}
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>

                                {/* <button onClick={handleReset} className=" my-10 btn btn-primary">Reset</button> */}
                            </div>
                            <div>
                                <p>Already have account ? <Link to='/login' className='underline'>Login here</Link> </p>
                            </div>
                            <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 my-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Register with Google</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;