import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import Invoice from "../../components/order/Invoice";
import UpdateStatusForm from '../forms/UpdateStatusForm'
import { PDFDownloadLink } from '@react-pdf/renderer';

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import {  Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TextField, MenuItem} from '@material-ui/core';

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
            fontSize: '2.5rem'
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



const Orders = ({ orders, handleStatusChange, handleSendStatusChange, allusers }) => {
    const classes = useStyles();
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
     
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
                    <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    {p.typeOfChoice ? <>{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</> : ''}
                                    {p.instructions ? <><br />{p.instructions}</> : ''}
                                  
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Typography sytle={{fontFamily: 'Nunito'}}>${p.product.price.toFixed(2)}</Typography> 
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Typography sytle={{fontFamily: 'Nunito'}}>{p.count}</Typography>  
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Typography sytle={{fontFamily: 'Nunito'}}>${(p.count * p.product.price).toFixed(2)}</Typography>  
                    </StyledTableCell>
                </StyledTableRow >
                ))}
                    {order.paymentIntent.payment_method_types[0] === 'card' ? <StyledTableRow key={Math.random()}>
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
                        <Typography sytle={{fontFamily: 'Nunito'}}>${(getTotal(order).toFixed(2))}</Typography>
                        </StyledTableCell>
                    </StyledTableRow > :
                    null
                    }
                    {order.paymentIntent.payment_method_types[0] === 'card' ? <StyledTableRow key={Math.random()}>
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
                        <Typography sytle={{fontFamily: 'Nunito'}}>${(((order.paymentIntent.amount)/100) - getTotal(order)).toFixed(2)}</Typography>
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
            document={<Invoice order={order} user={user} allusers={allusers}/>}
            fileName="invoice.pdf"
            className="btn btn-block"
            style={{color: '#fca311'}}
        >
           <Typography variant='subtitle2'>Download Receipt</Typography>
        </PDFDownloadLink>
    );

    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className={classes.cardContainer}>

                    <ShowPaymentInfo order={order} showStatus={false} allusers={allusers} />

                    <div className="row">
                        <div className="col-md-4 mt-2 mb-2">
                        <Typography style={{ fontFamily: "Nunito", fontWeight: 'bold'}}>Order Status</Typography>
            
                            <TextField
                            select
                                onChange={(e) =>
                                    handleStatusChange(order._id, e.target.value)
                                }
                                defaultValue={order.orderStatus}
                                name="status"
                                InputProps={{
                                    style: {
                                        fontFamily: "Nunito",
                                        color: '#fca311',
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                 <MenuItem value='Received' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Received
                                 </MenuItem>
                                 <MenuItem value='Confirmed' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Confirmed
                                 </MenuItem>
                                 <MenuItem value='Ready for Pickup' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Ready for Pickup
                                 </MenuItem>
                                 <MenuItem value='Completed' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Completed
                                 </MenuItem>
                                 <MenuItem value='Cancelled' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Cancelled
                                 </MenuItem>
                                
                            </TextField>
                            </div>

                            <div className="col-md-4 mt-2 mb-2">
                            <Typography style={{ fontFamily: "Nunito", fontWeight: 'bold'}}>Email Status</Typography>
            
                            <TextField
                                select
                                onChange={(e) =>
                                    handleSendStatusChange(order._id, e.target.value)
                                }
                                defaultValue={order.sendStatus}
                                name="status"
                                InputProps={{
                                    style: {
                                        fontFamily: "Nunito",
                                        color: '#fca311',
                                        fontWeight: 'bold'
                                    }
                                }}
                              
                            >
                                 <MenuItem value='Not sent' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Not sent
                                 </MenuItem>
                                 <MenuItem value='Sent' style={{fontFamily: 'Nunito', color: '#fca311'}}>
                                 Sent
                                 </MenuItem>
                                
                            </TextField>
                            </div>
                    </div>

                    {showOrderInTable(order)}
                
                     <div className="row">
                        <div className="col">
                            {showDownloadLink(order)}
                        </div>
                    </div>

                    <div className="row">
                            <div className="col">
                                <UpdateStatusForm allusers={allusers} order={order} />
                            </div>
                        </div>
               
                </div>
            ))}
        </>
    );
}
export default Orders;