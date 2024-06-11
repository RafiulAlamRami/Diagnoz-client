import React, { createContext, useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from '../Components/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Components/Hooks/useAxiosSecure';
import axios from 'axios';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';

export const AuthContext=createContext()
const auth = getAuth(app);
const AuthProviderr = ({children}) => {
    // console.log(children);
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const [status,setStatus]=useState(null)


    // for jwt
    const axiosPublic=useAxiosPublic()

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn=()=>{
        return signInWithPopup(auth,provider)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile=(name,photo)=>{
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          });
    }

    useEffect(()=>{
        const unSuscribe=onAuthStateChanged(auth,(currentUser)=>{
            console.log('currentUser : ',currentUser);
            setUser(currentUser)
            if(currentUser){
                // get token and store client
                const userInf={email:currentUser.email}
                axiosPublic.post('/jwt',userInf)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })

                // fetch(`http://localhost:5000/user/${currentUser.email}`)
                // .then(res=>res.json())
                // .then(data=>{
                //     console.log(data);
                //     setUs(data)
                // })

                axios.get(`http://localhost:5000/user/${currentUser.email}`)
                .then(res=>{
                    // console.log(res.data.status);
                    setStatus(res.data.status)
                })
                
            }
            else{
                // TODO: remove Token (if token stored in the client side: local storage,caching,in memory)
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            // setLoading(false)
        });
        return ()=>{
            return unSuscribe();
        }
    },[axiosPublic])

    // console.log(status);

    const userInfo={
        user,
        status,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviderr;