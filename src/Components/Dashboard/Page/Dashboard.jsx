import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { MdReviews, MdFormatListBulletedAdd, MdOutlineRestaurantMenu } from "react-icons/md";
import { GrTestDesktop } from "react-icons/gr";
import { ImBook } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { useAdmin } from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useActive from '../../Hooks/useActive';
import { IoMdStats } from "react-icons/io";
import { BiImageAdd } from 'react-icons/bi';



const Dashboard = () => {

    

    const [isAdmin] = useAdmin()
    // const isAdmin=true
    
const Navigate=useNavigate()
    const auth = useAuth()
    // console.log(auth.user);
    const { user, loading } = auth

    const st=useActive()

    // console.log(st);

    if (!st) {
       return  <div>
        <p className='text-red-600 my-10'>You are Blocked by Admin please contact !!!</p>
        <Link to={'/'} className='m-8'><button className='btn'>Go Home</button></Link>
        <Link to={'/contact'}><button className='btn'>Contact us</button></Link>
       </div>
    }

    if (loading) {
        return <p>loading .....</p>
    }

    // if (!token) {
    //     return <p>loading .....</p>
    // }

    // if (!isActive) {

    //     navigate('/')
    // }


    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu'>

                    {
                        isAdmin ?
                            <div>
                                <li className='my-1'><NavLink to='/dashboard/adminHome'><FaHome></FaHome>Admin Home</NavLink></li>

                                <li className='my-1'><NavLink to='/dashboard/addTest'><GrTestDesktop />Add new test</NavLink></li>

                                <li className='my-1'><NavLink to='/dashboard/allTest'><MdFormatListBulletedAdd />All Tests</NavLink></li>

                                {/* <li className='my-1'><NavLink to='/dashboard/reservation'><ImBook />Reservation</NavLink></li> */}

                                <li className='my-1'><NavLink to='/dashboard/allUsers'><HiUserGroup />All Users</NavLink></li>

                                <li className='my-1'><NavLink to='/dashboard/addBanner'><BiImageAdd className='' />Add Banner</NavLink></li>

                                <li className='my-1'><NavLink to='/dashboard/allBanner'><MdFormatListBulletedAdd />All Banner</NavLink></li>

                                <li className='my-1'><NavLink to='/dashboard/stats'><IoMdStats />Stats</NavLink></li>

                            </div>
                            :
                            <div>
                                <li className='my-1'><NavLink to='/dashboard/userHome'><FaHome></FaHome>My Profile</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/appoinment'>My Upcoming Appointments</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/testResult'>Test results</NavLink></li>

                               
                            </div>
                    }

                   

                    <div className="divider bg-white h-[1px]"></div>

                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/allTests'><MdFormatListBulletedAdd />All Test</NavLink></li>
                    <li><NavLink to='/contact'><FaEnvelope />Contact Us</NavLink></li>
                    
                </ul>
            </div>
            <div className='flex-1 px-10 py-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;