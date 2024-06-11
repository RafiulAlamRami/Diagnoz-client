import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { MdReviews, MdFormatListBulletedAdd, MdOutlineRestaurantMenu } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { useAdmin } from '../../Hooks/useAdmin';



const Dashboard = () => {

    const [isAdmin]=useAdmin()
    // const isAdmin=true

    
    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu'>

                    {
                        isAdmin ?
                            <>
                                <li className='my-1'><NavLink to='/dashboard/adminHome'><FaHome></FaHome>Admin Home</NavLink></li>
                                {/* <li className='my-1'><NavLink to='/dashboard/addItem'><MdOutlineRestaurantMenu />Add Items</NavLink></li> */}
                                {/* <li className='my-1'><NavLink to='/dashboard/manageItems'><MdFormatListBulletedAdd />Manage Items</NavLink></li> */}
                                {/* <li className='my-1'><NavLink to='/dashboard/manageBookings'><ImBook />Manage Bookings</NavLink></li> */}
                                <li className='my-1'><NavLink to='/dashboard/allUsers'><HiUserGroup />All Users</NavLink></li>
                                {/* <li className='my-1'><NavLink to='/dashboard/paymentHistory'><MdFormatListBulletedAdd />My Payment History</NavLink></li> */}
                            
                            </>
                            :
                            <>
                                <li className='my-1'><NavLink to='/dashboard/userHome'><FaHome></FaHome>User Home</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/cart'><FaShoppingCart />My Cart</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/reservation'><FaCalendarAlt />Reservation</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/review'><MdReviews />Review</NavLink></li>
                                <li className='my-1'><NavLink to='/dashboard/paymentHistory'><MdFormatListBulletedAdd />My Payment History</NavLink></li>
                            </>
                    }

                    {/* <li><NavLink to='/dashboard/userHome'><FaHome></FaHome>User Home</NavLink></li>
                    <li><NavLink to='/dashboard/cart'><FaShoppingCart />My Cart</NavLink></li>
                    <li><NavLink to='/dashboard/reservation'><FaCalendarAlt />Reservation</NavLink></li>
                    <li><NavLink to='/dashboard/review'><MdReviews />Review</NavLink></li>
                    <li><NavLink to='/dashboard/booking'><MdFormatListBulletedAdd />My bookings</NavLink></li> */}

                    <div className="divider bg-white h-[1px]"></div>

                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/shop/salad'><MdOutlineRestaurantMenu />Menu</NavLink></li>
                    <li><NavLink to='/contact'><FaEnvelope />Contact Us</NavLink></li>
                    {/* <li><NavLink to='/dashboard/userHome'><FaHome></FaHome>Shop</NavLink></li>
                    <li><NavLink to='/dashboard/userHome'><FaHome></FaHome>Contact</NavLink></li> */}
                </ul>
            </div>
            <div className='flex-1 px-10 py-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;