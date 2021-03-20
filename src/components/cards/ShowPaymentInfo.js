import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import {  Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));


const ShowPaymentInfo = ({ order, showStatus = true, allusers }) => {
    const classes = useStyles();


    return (
    <>   
    <Typography variant='subtitle2'>Order Id: {order._id}</Typography>
     {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u =>  <Typography key={u._id} variant='subtitle2'>Order Name: {u.name}</Typography>) : <Typography variant='subtitle2'>Order Name: {order.orderedBy.name}</Typography>}
    {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u =>  <Typography key={u._id} variant='subtitle2'>Email: {u.email}</Typography>) : ''} 

    {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u => <Typography key={u._id}variant='subtitle2'>Order Pickup: {new Date(u.address).toLocaleString()}</Typography>) : <Typography variant='subtitle2'>Order Pickup: {new Date(order.orderedBy.address).toLocaleString()}</Typography>} 

    <Typography variant='subtitle2'>Ordered on:  {new Date(order.createdAt).toLocaleString()}</Typography>
    <Typography variant='subtitle2'>Method: {order.paymentIntent.payment_method_types[0]}</Typography>
    {/* <Typography variant='subtitle2'>Payment: {order.paymentIntent.status.toUpperCase()}</Typography> */}
    <Typography> {showStatus && (<span className="badge text-white" style={{backgroundColor: '#fca311', fontFamily: 'Nunito'}}>
                STATUS: {order.orderStatus}
            </span>)}</Typography>

    </>
    )
};

export default ShowPaymentInfo;
