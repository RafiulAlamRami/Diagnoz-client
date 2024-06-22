
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Home = () => {

    const axiosPublic = useAxiosPublic()

    const { data: banner = [], refetch } = useQuery({
        queryKey: ["banner-home"],
        queryFn: async () => {
            const res = await axiosPublic.get('/banner-home')
            return res.data
        }
    })

    console.log(banner);

    const { data: feaTest = [] } = useQuery({
        queryKey: ["feaTest"],
        queryFn: async () => {
            const res = await axiosPublic.get('/featured-test')
            return res.data
        }
    })

    const { data: healthTips = [] } = useQuery({
        queryKey: ["healthTips"],
        queryFn: async () => {
            const res = await axiosPublic.get('/healthTips')
            return res.data
        }
    })

    const { data: commingTest = [] } = useQuery({
        queryKey: ["commingTest"],
        queryFn: async () => {
            const res = await axiosPublic.get('/commingTest')
            return res.data
        }
    })

    return (
        <div>
            <Helmet>
                <title>Home | Diagnoz</title>
            </Helmet>

            {/* Banner------------ */}
            <div className='my-10'>
                <div className={`hero min-h-[80vh]`} style={{ backgroundImage: `url("${banner.image}")` }} >
                    {/* style={{ backgroundImage: `${banner.image}` }} */}
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">{banner.title}</h1>
                            <p className="mb-5">{banner.description}</p>
                            <div className='flex gap-16'>
                                <p>Coupon Code : {banner.coupon}</p>
                                <p>Use the coupon for {banner.couponRate}% discount </p>
                            </div>
                            <Link to={'/allTests'}><button className="btn btn-primary my-5">See All Tests</button></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured tests------------ */}
            <div>
                <div className='mt-20 mb-10'>
                    <p className='text-2xl'>Our Featured Tests</p>
                </div>
                <div className='flex justify-center '>
                    {/* {allTests.length} */}
                    <div className=' grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-5'>
                        {feaTest?.slice(-6).map(test =>
                            <div key={test._id} className="card w-96 bg-base-100 shadow-xl my-5 border-2">
                                <div className=''>
                                    <img className='h-[200px] rounded-md' src={test.image} alt="Shoes" />
                                </div>
                                <div className="card-body">
                                    <div className='flex justify-between'>
                                        <h2 className="card-title">{test.name}</h2>
                                        <h2 className="card-title">${test.price}</h2>
                                    </div>
                                    <p className='text-center'>{test.shortDes}</p>
                                    <div className="card-actions justify-between items-center">
                                        <Link to={`/details/${test._id}`}><button className="btn btn-primary">See Details</button></Link>
                                        <p className='bg-green-400 bg-opacity-40 rounded-sm'>Available Slot : {test.slot}</p>

                                    </div>
                                    <div>
                                        <p className='text-[1.1rem] bg-yellow-400  font-semibold py-3 rounded-md'>Test Date : {test.date}/{test.month}/{test.year}</p>
                                    </div>
                                    {/* <div onClick={()=>handleDateChange(test)}>
                                    <DatePicker placeholderText='Click here to see date' className='btn outline-none'
                                        selected={startDate}
                                        filterDate={isDateEnabled}
                                        
                                    />
                                    
                                </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Promotions------------ */}
            <div className='my-10'>
                <div className='mt-20 mb-10'>
                    <p className='text-2xl'>Specials Deals</p>
                </div>
                <div className='flex justify-center'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:flex gap-5 md:gap-5 lg:gap-5 justify-center'>
                        <div className="card w-96 bg-base-100 shadow-xl border-2">
                            <div className="card-body">
                                <h2 className="card-title">Heart Health Awareness Campaign</h2>
                                <p className='my-2'>Join our Heart Health Awareness Campaign and receive a free ECG test with any cardiac screening package. Available for a limited time only.</p>
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl border-2">
                            <div className="card-body">
                                <h2 className="card-title">Corporate Wellness Programs</h2>
                                <p className='my-2'>Enhance your employees health with our tailored corporate wellness programs. Special rates available for companies and organizations. Contact us for more details.</p>
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="card w-96 bg-base-100 shadow-xl border-2">
                            <div className="card-body">
                                <h2 className="card-title">Online Booking Discount</h2>
                                <p className='my-2'>Save time and money by booking your diagnostic tests online. Enjoy discount on all online bookings. Fast, easy, and convenient!</p>
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalized recom------------ */}

            <div className='mb-10'>
                <div className='mt-20 mb-10'>
                    <p className='text-2xl font-bold'>Personalized recommendation</p>
                </div>

                <div className='grid grid-cols-1 md:flex lg:flex gap-4 '>
                    <div className='w-full md:w-1/2 lg:w-1/2'>
                        <p className='text-xl font-bold'>Health Tips</p>

                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                            <div>
                                {
                                    healthTips.map(tips => <div key={tips._id}>
                                        <SwiperSlide>
                                            <div className=''>
                                                <div className='p-16'>
                                                    <p className='mb-5 font-semibold'>{tips.title}</p>
                                                    <p>{tips.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </div>)
                                }
                            </div>


                        </Swiper>

                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/2'>
                        <div>
                            <p className='text-xl font-bold'>Upcomming test</p>
                            <p className='text-xl font-semibold'>Healthcare professionals suggested</p>
                        </div>

                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                            <div>
                                {
                                    commingTest.map(test => <div key={test._id}>
                                        <SwiperSlide>
                                            <div className='p-16'>
                                                <p className='mb-5 font-semibold'>{test.title}</p>
                                                <div className='h-20 w-full object-contain'>
                                                    <img src={test.image} alt="" />
                                                </div>
                                                <p className='text-white bg-black'>{test.description}</p>
                                            </div>
                                        </SwiperSlide>
                                    </div>)
                                }
                            </div>


                        </Swiper>

                    </div>
                </div>
            </div>

            

        </div>
    );
};

export default Home;