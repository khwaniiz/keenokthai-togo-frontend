import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Route} from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect'
import {currentAdmin} from '../functions/auth'

// Protect route

const AdminRoute = ({children, ...rest}) => {

    const {user} = useSelector((state) => ({...state}))
    const [isAdmin, setIsAdmin] = useState(false)

   useEffect(()=> {
       if(user && user.token) {
           currentAdmin(user.token).then((res) => {
               //console.log('Current admin res', res)
               setIsAdmin(true)
           })
           .catch(err => {
               console.log('Admin rout error', err)
               setIsAdmin(false)
           })
       }
   },[user])
 
    return (isAdmin  ? (<Route {...rest}  />) : (<LoadingToRedirect />))
}

export default AdminRoute
