import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {  Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, } from '@material-ui/core';

import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import Invoice from "../../components/order/Invoice";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontFamily: 'Nunito',
        fontSize: '1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '.75rem',
        }
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({

    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1612220926/jonny-clow-xZa4JUE7EdM-unsplash_dydmwi.jpg')`,
        height: '50vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: -1
    },
    headerFirst: {
        color: '#fff',
        margin: "1.5rem 0",
        [theme.breakpoints.down('md')]: {

            fontSize: '3.75rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem'
        }
    },

    cardContainer: {
        backgroundColor: '#fff;',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '20px 10px 20px 10px',
    }

}));

const History = () => {
    const classes = useStyles();
    const { user } = useSelector(state => ({ ...state }))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadUserOrders()
        window.scrollTo(0, 0)
    }, [])


    const loadUserOrders = () => getUserOrders(user.token).then(res => {
        //console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
      
    })

    const getTotal = (order) => {
    let total = 0;

    if(order.products.extraCharge) {

        for(let i = 0; i<order.products.length; i++) {

            total = order.products[i].product.price * order.products[i].count + total
        }

    } else {
        for(let i = 0; i<order.products.length; i++) {

            total = (order.products[i].product.price + order.products[i].extraCharge) * order.products[i].count + total
        }
    }
 
        return total
    }

  

    const showOrderInTable = (order) => (
        
        <TableContainer component={Paper} variant='outlined'>
        <Table className={classes.table} aria-label="customized table">
            <TableHead style={{fontFamily: 'Nunito'}}>
                <TableRow>

                    <StyledTableCell align="center">Product</StyledTableCell>
                    <StyledTableCell align="center">Special Instructions</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {order.products.map((p, i) => (
           
                    <StyledTableRow key={i}>
                        <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>{p.product.title}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>{p.typeOfChoice ? <>{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</> : ''}<br />{p.instructions === '' ? '' : p.instructions}</Typography>  
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>${p.extraCharge === 0 ? ((p.product.price).toFixed(2)) : ((p.product.price + p.extraCharge).toFixed(2))}</Typography> 
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>{p.count}</Typography>  
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>${p.extraCharge === 0 ? ((p.count * (p.product.price)).toFixed(2)) : ((p.count * (p.product.price + p.extraCharge)).toFixed(2))}</Typography> 
                        </StyledTableCell>

                    </StyledTableRow >
                
                ))}

                  {order.paymentIntent.payment_method_types[0] === 'card' ? 
                    <StyledTableRow key={Math.random()}>
                       <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>Sub Total</Typography>
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>${(getTotal(order)).toFixed(2)}</Typography>
                        </StyledTableCell>
                    </StyledTableRow > :
                    null
                    }

                   {order.paymentIntent.payment_method_types[0] === 'card' ? 
                   <StyledTableRow key={Math.random()}>
                       <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>Card fee</Typography>
                        </StyledTableCell>
                         <StyledTableCell align="center">           
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>${(((order.paymentIntent.amount)/100).toFixed(2) - getTotal(order)).toFixed(2)}</Typography>
                        </StyledTableCell>
                    </StyledTableRow > :
                    null
                    }

                    <StyledTableRow key={Math.random()}>
                       <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>Total</Typography>
                        </StyledTableCell>
                         <StyledTableCell align="center">
                         </StyledTableCell>
                         <StyledTableCell align="center">
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                         <StyledTableCell align="center">
                        <Typography sytle={{fontFamily: 'Nunito'}}>${((order.paymentIntent.amount)/100).toFixed(2)}</Typography>
                        </StyledTableCell>
                    </StyledTableRow >
            </TableBody>
        </Table>
    </TableContainer>

    );


    const showDownloadLink = (order) => (
        <PDFDownloadLink
        key={Math.random()}
            document={<Invoice order={order} user={user} />}
            fileName="invoice.pdf"
            className="btn btn-block"
            style={{color: '#fca311'}}
        >
           <Typography variant='subtitle2'>Download Receipt</Typography>
        </PDFDownloadLink>
    );


    const showEachOrders = () => (
        orders.reverse().map((order, i) => (
            <div key={i} className={classes.cardContainer}>
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        {showDownloadLink(order)}
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <>
     
            {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>My Purchase History</Typography>
            </Box>
        <div className="container-fluid">
            <div className="row mt-5 mb-5">
                <div className="col-md-3">
                    <UserNav />
                </div>
                <div className="col-md-9">
                    <Typography variant='h6' className="mb-3">
                        {orders ? "Past Orders" : "No purchased orders"}
                    </Typography>
                    {showEachOrders()}
                </div>
            </div>
        </div>
        </>
    )
}

export default History
