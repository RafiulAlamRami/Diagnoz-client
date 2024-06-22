import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosRestaurant } from 'react-icons/io';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { GrTestDesktop } from 'react-icons/gr';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import useAxiosPublic from '../../Hooks/useAxiosPublic';




const Addtest = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState(null);
    // const onChange = (dates) => {
    //     const [start, end] = dates;
    //     setStartDate(start);
    //     setEndDate(end);
    // };

    const [selectedDate, setSelectedDate] = useState(null);
    // console.log(selectedDate?.getDate());
    // console.log(selectedDate?.getMonth());
    // console.log(selectedDate?.getYear());




    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)

        const newTest = {
            name: data.name,
            image: data.image,
            shortDes: data.shortDes,
            longDes: data.longDes,
            price: parseFloat(data.price),
            slot: data.slot,
            date: selectedDate?.getDate(),
            month: selectedDate?.getMonth() + 1,
            year: selectedDate?.getYear() + 1900,
            // endDate: endDate?.getDate(),
            // endMonth: endDate?.getMonth() + 1,
            // endYear: endDate?.getYear() + 1900,

        }

        console.log(newTest);

        const res = await axiosSecure.post('/addtest', newTest)
        console.log(res.data);
        reset()
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} added successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }



    return (
        <div>
            <div className="flex justify-center">
                <p className='text-2xl border-b-2 w-40'>Add New test</p>
            </div>

            <div className='py-5 max-w-full border-2 px-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-5'>
                        <div className=' w-1/2'>
                            <label className='label'>Test Name</label>
                            <input type='text' className=' input input-bordered w-full' {...register("name", { required: true })} placeholder='Test Name' />
                        </div>
                        <div className='w-1/2'>
                            <label className='label'>Price</label>
                            <input type="number" {...register("price", { required: true })} placeholder='Price' className=' input input-bordered w-full' />
                        </div>
                    </div>

                    <div className='py-5 w-full flex gap-5'>
                        <div className='w-1/2'>
                            <label className='label'>Test Details</label>
                            <textarea placeholder="Test details" {...register("longDes", { required: true })} className="mt-3 textarea textarea-bordered textarea-lg w-full" ></textarea>
                        </div>
                        <div className='w-1/2'>
                            <label className='label'>Test Short Description</label>
                            <textarea placeholder="Test Short Description" {...register("shortDes", { required: true })} className="mt-3 textarea textarea-bordered textarea-lg w-full" ></textarea>
                        </div>
                    </div>


                    <div className='flex w-full gap-3 mt-5'>

                        <div className='w-3/4'>
                            <label className='label'>Image Url</label>
                            <input type="text" placeholder='Image url' {...register("image", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <div className='w-1/4'>
                            <label className='label'>Slot</label>
                            <input type="number" placeholder='Slot' {...register("slot", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className='mt-5'>

                        {/* <label className='label'>Date</label>
                            <input type="number" {...register("slot", { required: true })} className="input input-bordered w-full" /> */}

                        {/* <DatePicker className="input input-bordered w-full"
                            selected={startDate}
                            onChange={onChange}
                            minDate={new Date()}
                            //   maxDate={addMonths(new Date(), 5)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            showDisabledMonthNavigation
                        /> */}

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
                        <button className='btn my-2 bg-black text-white hover:bg-slate-900 w-2/5'>Add Test<GrTestDesktop className='ml-2 text-2xl' /></button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Addtest;