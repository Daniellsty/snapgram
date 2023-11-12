import { getCurrentUser } from '@/lib/appwrite/api';
import {  IUser } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

 type IContextType={
    user:IUser;
    isLoading:boolean,
    isAuthenticated:boolean;
    setUser:React.Dispatch<React.SetStateAction<IUser>>,
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser:()=> Promise<boolean>;
  
  };

export const INITAL_USER ={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''

};

  const INITIAL_STATE={
    user :INITAL_USER,
    isLoading:false,
    isAuthenticated :false,
    setUser:()=> {},
    setIsAuthenticated:()=> {},
    checkAuthUser:async ()=> false as boolean
};


const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children} :{children : React.ReactNode }) => {
    const navigate = useNavigate()

    const [user,setUser] = useState<IUser>(INITAL_USER);
    const [isLoading,setIsLoading] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const checkAuthUser =async ()=>{
        try {

            const currentAccount = await getCurrentUser();

            if(currentAccount){
              setUser({
                id:currentAccount.$id,
                name:currentAccount.name,
                username:currentAccount.username,
                email:currentAccount.email,
                imageUrl:currentAccount.imageUrl,
                bio:currentAccount.bio
              })
              
                          setIsAuthenticated(true);
                          return true;

            }


            return false;


        } catch (error) {
            console.log(error);
            return false;

            
        }finally{
            setIsLoading(false)
        }
    };


    useEffect(()=>{
        if(localStorage.getItem('cookieFallback') === '[]'
        || localStorage.getItem('cookieFallback') === null
        ) navigate('/sign-in')
        
        checkAuthUser();

    },[])

    const values ={
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,

    }


  return (
    <AuthContext.Provider value={values}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = ()=> useContext(AuthContext);