import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { GrTestDesktop } from 'react-icons/gr';
import DatePicker from "react-datepicker";
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UpdateTest = () => {
    const { id } = useParams()
    console.log(id);

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    
    const [selectedDate, setSelectedDate] = useState();
    const [updat, setUpdat] = useState()

    const { data: test = [], refetch } = useQuery({
        queryKey: ["tests-admin"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/test-allTest/${id}`)
            return  res.data
        }
    })


    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)

        const updateTest = {
            id: test?._id,
            name: data.name || test?.name,
            image: data.image || test?.image,
            shortDes: data.shortDes || test?.shortDes,
            longDes: data.longDes || test?.longDes,
            price: parseFloat(data.price) || parseFloat(test?.price),
            slot: data.slot || test?.slot,
            date: selectedDate?.getDate() || test?.date,
            month: selectedDate?.getMonth() + 1 || test?.month,
            year: selectedDate?.getYear() + 1900 || test?.year,
            // endDate: endDate?.getDate(),
            // endMonth: endDate?.getMonth() + 1,
            // endYear: endDate?.getYear() + 1900,

        }

        console.log(updateTest);

        const res = await axiosSecure.patch('/updateTest', updateTest)
        console.log(res.data);
        reset()
        refetch()
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} Update successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `something wrong`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div>

            <div>
            <p className='my-5 text-2xl font-bold'> Update {test.name} </p>
            </div>


            <div className='py-5 max-w-full border-2 px-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-5'>
                        <div className=' w-1/2'>
                            <label className='label'>Test Name</label>
                            <input type='text' className=' input input-bordered w-full' {...register("name")} placeholder={test?.name} />
                        </div>
                        <div className='w-1/2'>
                            <label className='label'>Price</label>
                            <input type="number" {...register("price")} placeholder={test?.price} className=' input input-bordered w-full' />
                        </div>
                    </div>

                    <div className='py-5 w-full flex gap-5'>
                        <div className='w-1/2'>
                            <label className='label'>Test Details</label>
                            <textarea placeholder={test?.longDes} {...register("longDes")} className="mt-3 textarea textarea-bordered textarea-lg w-full" ></textarea>
                        </div>
                        <div className='w-1/2'>
                            <label className='label'>Test Short Description</label>
                            <textarea placeholder={test?.shortDes} {...register("shortDes")} className="mt-3 textarea textarea-bordered textarea-lg w-full" ></textarea>
                        </div>
                    </div>


                    <div className='flex w-full gap-3 mt-5'>

                        <div className='w-3/4'>
                            <label className='label'>Image Url</label>
                            <input type="text" placeholder={test?.image} {...register("image")} className="input input-bordered w-full" />
                        </div>

                        <div className='w-1/4'>
                            <label className='label'>Slot</label>
                            <input type="number" placeholder={test?.slot} {...register("slot")} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className='mt-5'>



                        {/* ------------------ */}
                        <div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()} // This will disable all dates before today
                                inline
                            />
                            <div>
                                Selected Date: {selectedDate ? selectedDate.toDateString() : "None"}
                            </div>
                        </div>
                        {/* ---------------- */}

                    </div>

                    <div className='flex justify-center my-5'>
                        {/* <input className='btn' type="submit" value='Add item' /> */}
                        <button className='btn my-2 bg-black text-white hover:bg-slate-900 w-2/5'>Update Test<GrTestDesktop className='ml-2 text-2xl' /></button>
                    </div>
                    <div className='text-center'>
                        {updat && `${updat}`}
                    </div>
                </form>
            </div>




        </div>
    );
};

export default UpdateTest;