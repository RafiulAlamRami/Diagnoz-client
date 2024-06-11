import React, { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../../Providerr/AuthProviderr';





const Login = () => {

    const { signIn, user,googleSignIn } = useContext(AuthContext)
    const axiosPublic=useAxiosPublic()


    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";



    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        // const email=emailRef.current.value
        const email = form.email.value
        const password = form.password.value

        // console.log(email);
        // console.log(password);

        signIn(email, password)
            .then(result => {
                // const user = result.user
                // console.log(user);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully login",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/dashboard/userHome');

            })
            .catch(error=>{
                // console.log(error.message);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: `Something wrong.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
    }


    const handleGoogleSignIn=()=>{

        googleSignIn()
        .then(result=>{
            const user=result.user
            console.log(user);
            const userInfo={
                name:user.displayName,
                email:user.email,
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                // console.log("from axios : ",res);
                console.log("from login page axios : ",res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Login Successfull.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                if (res.data.insertedId) {
                    
                    console.log("user added in database");
                    
                }
                else{
                    console.log("already exsist : ",res.data.message,res.data.insertedId);
                }
            })
            navigate('/dashboard/userHome');
        })
        .catch(error=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    if (user) {
        return <Navigate to='/'></Navigate>
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-9">Login now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                {/* <input ref={emailRef} type="email" name='email' placeholder="email" className="input input-bordered" required /> */}
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value="Login" />
                            </div>
                            <div>
                                <p>Dont have account ? <Link to='/register' className='underline'>Register here</Link> </p>
                            </div>
                            <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 my-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Login with Google</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;