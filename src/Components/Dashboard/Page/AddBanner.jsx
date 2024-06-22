import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { GrTestDesktop } from 'react-icons/gr';
import Swal from 'sweetalert2';

const AddBanner = () => {
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)

        const newBanner = {
            name: data.name,
            title:data.title,
            description:data.description,
            coupon:data.coupon,
            couponRate:data.couponRate,
            image: data.image,
            isActive:false,

        }

        console.log(newBanner);

        const res = await axiosSecure.post('/addbanner', newBanner)
        console.log(res.data);
        reset()
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Banner added successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    return (
        <div>
            <div>
                <div className="flex justify-center mb-16">
                    <p className='text-2xl border-b-2 w-40'>Add  Banner</p>
                </div>

                <div className='py-5 max-w-full border-2 px-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-5'>
                            <div className=' w-1/2'>
                                <label className='label'>Banner Name</label>
                                <input type='text' className=' input input-bordered w-full' {...register("name", { required: true })} placeholder='Banner Name' />
                            </div>
                            <div className='w-1/2'>
                                <label className='label'>Banner Title</label>
                                <input type="text" {...register("title", { required: true })} placeholder='Banner Title' className=' input input-bordered w-full' />
                            </div>
                        </div>

                        <div className='py-5 w-full flex gap-5'>
                            <div className='w-1/2'>
                                <label className='label'>Banner Description</label>
                                <input type='text' placeholder="Banner Description" {...register("description", { required: true })} className="mt-3 textarea textarea-bordered textarea-lg w-full" />
                            </div>
                            <div className='w-1/2'>
                                <label className='label'>Coupon Code </label>
                                <input type='text' placeholder="Coupon Code" {...register("coupon", { required: true })} className="mt-3 textarea textarea-bordered textarea-lg w-full" />
                            </div>
                        </div>


                        <div className='flex w-full gap-3 mt-5'>

                            <div className='w-3/4'>
                                <label className='label'>Image Url</label>
                                <input type="text" {...register("image", { required: true })} className="input input-bordered w-full" />
                            </div>

                            <div className='w-1/4'>
                                <label className='label'>Cupon Rate</label>
                                <input type="number" {...register("couponRate", { required: true })} className="input input-bordered w-full" placeholder='Cupon Rate' />
                            </div>
                        </div>


                        {/* <div className='mt-10'>
                            <select defaultValue='default' {...register("isActive", { required: true })} className=' select select-bordered w-1/3'>
                            <option className='h-[100px]' value='default' disabled>is Active</option>
                                <option className='h-[100px]' value={'true'}>True</option>
                                <option className='h-[100px]' value={'false'}>False</option>
                            </select>
                        </div> */}



                        <div className='flex justify-center my-5'>
                            {/* <input className='btn' type="submit" value='Add item' /> */}
                            <button className='btn my-2 bg-black text-white hover:bg-slate-900 w-2/5'>Add Banner</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddBanner;