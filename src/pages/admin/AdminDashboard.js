import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getOrders, changeStatus, getAllUsers, changeSendStatus } from '../../functions/admin'
import Orders from '../../components/order/Orders'
import AdminNav from '../../components/nav/AdminNav'
import Hero from '../../components/Hero'

import { Typography } from '@material-ui/core';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const [allusers, setAllUsers] = useState([])
  const [status, setStatus] = useState([])
  // const [sendStatus, setSendStatus] = useState([])
  // const [orderCompleted, setOrderCompleted] = useState([])
  const { user } = useSelector((state) => ({ ...state }))


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
 
  useEffect(() => {
    loadOrders()
  }, [])

   useEffect(() => {
    loadUsers()
  }, [])

  const loadOrders = () => getOrders(user.token)
    .then(res => {
      //console.log('orders', res.data)
      setOrders(res.data)
    })

  const loadUsers = () => getAllUsers(user.token)
    .then(res => {
      //console.log('users', res.data)
      setAllUsers(res.data)
  })

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token)
      .then(res => {
        //console.log(res.data)
        toast.info('Status updated')
        loadOrders()
      })
  }

  const handleSendStatusChange = (orderId, sendStatus) => {
    changeSendStatus(orderId, sendStatus, user.token)
      .then(res => {
        //console.log(res.data)
        toast.info('Email status updated')
        loadOrders()
      })
  }

  const statusList = ['Received', 'Confirmed','Ready for Pickup','Completed', 'Cancelled']
  const sendStatusList = ['Not send', 'Send']

  const showStatus = () => (
    statusList.map(s => (
       <div
                key={statusList.indexOf(s)}
                onClick={() => {handleStatus(s); window.scrollTo(0, 0);}}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: "pointer", fontFamily: 'Nunito', fontSize: '1rem', backgroundColor: '#fca311' }}
            >
                {s}
            </div>
    ))
  )

  const handleStatus = (statusList) => {
    setStatus(statusList)
    //console.log('status now', status)
  }

   const showResult = () => (
    <Orders orders={orders.filter(order=> order.orderStatus === status)} handleStatusChange={handleStatusChange} handleSendStatusChange={handleSendStatusChange} allusers={allusers} />
   )


  return (
    <>
      <Hero title={'Admin Dashboard'}/>
        <div className="container-fluid">
          <div className="row mt-5 mb-5">
            <div className="col-md-3">
              <AdminNav />
            </div>

             <div className="col-md-9">
              <Typography variant='h6' className="mb-3">All Orders</Typography>
              {showStatus()} 
              {showResult()}
            </div>
          </div>
        </div>
    </>
  );
};

export default AdminDashboard;
