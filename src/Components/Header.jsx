import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from './Hooks/useAuth';
import Swal from 'sweetalert2';
import { useAdmin } from './Hooks/useAdmin';
import { AuthContext } from '../Providerr/AuthProviderr';
import useUser from './Hooks/useUser';
import useActive from './Hooks/useActive';

const Header = () => {

    const [isAdmin] = useAdmin()
    // const [st]=useUser()
    // console.log(st)

    const isActive=useActive()

    const auth = useAuth()
    // console.log(auth.user);
    const { user, logOut, status } = auth
    console.log(status);
    // console.log(user);
    // console.log(status);
    // const [isActive, setIsActive] = useState()

    // useEffect(() => {
    //     if (status === 'active') {
    //         setIsActive(true)
    //     }
    //     else {
    //         setIsActive(false)
    //     }
    // }, [status])


    const links = <>
        <li> <NavLink to={'/'} className='mr-2'>Home</NavLink></li>
        <li> <NavLink to={'/allTests'} className='mr-2'>All Tests</NavLink></li>
        <li> <NavLink to={'/blog'} className='mr-2'>Blogs</NavLink></li>
        <li className='text-red-500' > <NavLink to={'/emergency'} className='mr-2'>Emergency</NavLink></li>

        <li className='mr-2'> <NavLink to={'/contact'}>Contact Us</NavLink></li>
        <li className='mr-6'> <NavLink to={'/career'}>Career</NavLink></li>
        {/* {
            user && !isAdmin && isActive && <li className='bg-cyan-700 text-white rounded-sm'> <NavLink to='/dashboard/userHome'>Dashboard</NavLink> </li>
        } */}
        {
            user && !isAdmin && isActive && <li className='bg-cyan-700 text-white rounded-sm'> <NavLink to='/dashboard/userHome'>Dashboard</NavLink> </li>
        }
        {
            user && isAdmin && <li className='bg-cyan-700 text-white rounded-sm'> <NavLink to='/dashboard/adminHome'>Dashboard</NavLink> </li>
        }

    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log out successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Diagnoz</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user ?
                            <>
                                <div className="w-12 h-12 rounded-full mr-4 border-2">
                                    <img className='w-full h-full object-center rounded-full' alt=" image " src={user.photoURL} />
                                </div>
                                <Link onClick={handleLogOut}><button className='btn'> Logout</button></Link>
                            </>
                            :
                            <>
                                <Link to='/login'><button className='btn mr-6'> Login</button></Link>
                                <Link to='/register'><button className='btn mr-6'> Register </button></Link>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;