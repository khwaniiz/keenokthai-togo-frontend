import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
// import ReactQuil from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { toast } from "react-toastify";
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography, Box, TextField } from '@material-ui/core';

import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser, createVenmoOrderForUser,saveUserPickupDateTime, } from '../functions/user'



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
        fontFamily: 'Nunito',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80')`,
        height: '50vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
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

    tablePhoto: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },

    btn: {
        fontFamily: 'Nunito',
        textTransform: 'none',
        borderRadius: '200px',
        border: '1px rgba(9, 9, 9, 0.8) solid',
        transition: 'all .2s ease',
        color: '#fff',
        fontSize: '1rem',
        backgroundColor: 'rgba(9, 9, 9, 0.8)',
        padding: '5px 15px',
        margin: "1.5rem 1.5rem 0 0",
        '&:hover': {
            color: '#fca311',
             border: '1px #fca311 solid',
        }
    },
        buttonDisabled: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),

        fontFamily: 'Nunito',
        textTransform: 'none',
        borderRadius: '200px',
        border: '1px #efefefef solid',
         color: '#fca311',
        fontSize: '1rem',
        backgroundColor: '#efefefef',
        padding: '5px 15px',
        margin: "1.5rem 1.5rem 0 0",
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        borderRadius: '200px',
        border: '1px rgba(9, 9, 9, 0.8) solid',
        
    }, 
  }));

const Checkout = ({ history, isCredit }) => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('')
    const [total, setTotal] = useState(0);
    const [currentUser, setCurrentUser] = useState('')
    const [address, setAddress] = useState(null)
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')


    const dispatch = useDispatch();
    const { user, cash, venmo } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => (state.coupon));

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            //console.log("user cart res", res.data.products);
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
            setTotalAfterDiscount(0)
            setCoupon('')
        });
    }, []);

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart')
        }

        // remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        })

        // remove from backend
        emptyUserCart(user.token).then((res) => {
            setProducts([])
            setTotal(0)
            setTotalAfterDiscount(0)
            toast.info("Cart is empty. Continue shopping.");
        })
    };

    // save pickup date to db
    const saveAddressToDb = () => {
        const five = setHours(setMinutes(new Date(), 0), 17).getHours()
        const twelve = setHours(setMinutes(new Date(), 0), 12).getHours()
        const pickupHour = address.getHours();

        //console.log(address.getHours(), five, twelve )
        if(address.getDate() === new Date().getDate()) {
            //toast.warning('Please select a new date')
        } else if ((pickupHour !== five && pickupHour !== twelve)) {
            //toast.warning('Please select a new time')
        }
        else {
            saveUserPickupDateTime(address, user.token)
        .then(res => {
            if (res.data.ok) {
                setAddressSaved(true)
            }
            
        })

        }
        
        if(address.getDate() === new Date().getDate()) {
            toast.warning('Please select a valid pickup date')
        } else if ((pickupHour !== five && pickupHour !== twelve)) {
            toast.warning('Please select a valid pickup time')
        }
        else  {
            saveUserAddress(address, user.token)
            .then(res => {
                if (res.data.ok) {
                    setAddressSaved(true)
                    toast.info("Pick up time & date saved");
                }
            })
            .catch(err=> toast.warning("Failed"))
        }
      
    };


    const applyDiscountCoupon = () => {
        //console.log('send coupon to backend', coupon)
        // apply coupon
        applyCoupon(user.token, coupon)
            .then(res => {
                //console.log('RES ON COUPON APPLIED', res.data)
                if (res.data) {
                    setTotalAfterDiscount(res.data)
                    // update redux coupon applied true/false
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    })

                }
                // error  
                if (res.data.err) {
                    setDiscountError(res.data.err)
                    // update redux coupon applied true/false
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false
                    })

                }
            })
    }

    const filterDays = (date) => {

        const day = date.getDay();
        if (date <= new Date()) {
            return false;
        }         
        else if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
         return false
        }
        else {
            return true;
        }
    }

    // const filterTime = (time) => {
    //     const currentDate = new Date();
    //     const selectedDate = new Date(time);
    //     return currentDate.getTime() < selectedDate.getTime();
    // }

      
    const showAddress = () => (
        <>
            {/* <ReactQuil theme='snow' value={address} onChange={setAddress} />
            <Button onClick={saveAddressToDb} className={classes.btn}>
                Save
            </Button> */}
              <Box className={classes.inputContainer}>
                            <DatePicker
                                className={classes.input}
                                placeholderText="Select date and time"
                                selected={address}
                                value={address}
                                onChange={(date) => setAddress(date)}
                                showTimeSelect
                                dateFormat="MM/dd/yyyy  EE hh:mm a"                    
                                filterDate={filterDays}
                                required
                                minDate={addDays(new Date(), 5)}
                                includeTimes={[
                                    setHours(setMinutes(new Date(), 0), 12),
                                    setHours(setMinutes(new Date(), 0), 17),
                                  ]}
                           
                            />
                        </Box>
                        {address ? <Button variant='outlined' color='secondary' onClick={saveAddressToDb} className={classes.btn}>Save</Button> :''}
        </>
    )

    const showProductSummary = () => {
        return (
            <TableContainer component={Paper} variant='outlined'>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align="center">Product</StyledTableCell>
                            <StyledTableCell align="center">Options</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Quantity</StyledTableCell>
                            <StyledTableCell align="center">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((p, i) => (
                            // <div key={i}>
                            //     <p>{p.product.title} x {p.count} = {p.product.price * p.count}</p>
                            // </div>
                           
                            <StyledTableRow key={i}>
                                <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    {p.product.title}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    {p.typeOfChoice ? <>{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</> : ''}
                                    {p.instructions ? <><br/>{p.instructions}</> : ''}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    ${(p.product.price + p.extraCharge).toFixed(2)}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    {p.count}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{fontFamily: 'Nunito'}}>
                                    ${((p.product.price+p.extraCharge) * p.count).toFixed(2)}
                                </StyledTableCell>

                            </StyledTableRow >

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const showApplyCoupon = () => (
        <>
            <TextField
                onChange={(e) => {
                    setCoupon(e.target.value)
                    setDiscountError('')

                }}
                value={coupon}
                type="text"
                className="form-control"
            />
            <Button onClick={applyDiscountCoupon} className={classes.btn}>
                Apply
      </Button>

        </>
    )

    // CASH PAYMENT
    const createCashOrder = () => {
        createCashOrderForUser(user.token, cash, couponTrueOrFalse).then(res => {
            //console.log('USER CASH ORDER CREATED RES', res)
            // empty cart from redux, local storage, reset coupon, reset cash payment, redirect
            if (res.data.ok) {
                // empty local storage
                if (typeof window !== 'undefined') localStorage.removeItem('cart')

                // empty redux cart
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: []
                })
                // empty redux coupon
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false
                })

                // empty redux cash payment
                dispatch({
                    type: 'CASH_PAYMENT',
                    payload: false
                })

                // empty cart from database
                emptyUserCart(user.token)

                // redirect
                setTimeout(() => {
                    history.push("/cash-payment");
                }, 1000);
            }
        })
    }

    // VENMO PAYMENT
    const createVenmoOrder = () => {
        createVenmoOrderForUser(user.token, venmo, couponTrueOrFalse).then(res => {
            //console.log('USER VENMO ORDER CREATED RES', res)
            // empty cart from redux, local storage, reset coupon, reset cash payment, redirect
            if (res.data.ok) {
                // empty local storage
                if (typeof window !== 'undefined') localStorage.removeItem('cart')

                // empty redux cart
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: []
                })
                // empty redux coupon
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false
                })

                // empty redux cash payment
                dispatch({
                    type: 'VENMO_PAYMENT',
                    payload: false
                })

                // empty cart from database
                emptyUserCart(user.token)

                // redirect
                setTimeout(() => {
                    history.push("/cash-payment");
                }, 1000);
            }
        })
        .catch(err => console.log('venmo err front', err))
    }





    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero} >
                <Box m={2} textAlign="center">
                    <Typography variant='h1' className={classes.headerFirst}>Checkout</Typography>
                </Box>
            </ Box>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        <Typography variant='h6'>Pick Up Date &amp; Time</Typography>
                        <Typography variant='subtitle2'>
                            Saturday or Sunday, 12 PM or 5 PM
                        </Typography>
                         <Typography variant='subtitle2'>
                            Minimum 5 days in advance
                        </Typography>
                        <br />
                        {showAddress()}

                        <Typography variant='h6' style={{ marginTop: '2rem' }}>Got A Coupon?</Typography>
                        <br />
                        {showApplyCoupon()}
                        <br />
                        {discountError && <div className='text-danger p-2'>{discountError}</div>}
                    </div>

                    <div className="col-md-8 mt-5 mb-5">
                        <Typography variant='h6'>Order Summary</Typography>
                        <hr />
                        <Typography variant='subtitle2'>{products.length} Products</Typography>
                        <hr />
                        {showProductSummary()}
                        <hr />
                        {totalAfterDiscount > 0 && (
                            <Typography variant='subtitle2'>Discount Applied: Total: {totalAfterDiscount}</Typography>
                        )}
                        {!cash ? (coupon ?  <Typography variant='subtitle2'>Card Fee: ${Number(totalAfterDiscount * 0.029 + 0.3).toFixed(2)}*</Typography> : <Typography variant='subtitle2'>Card Fee: ${((total * 0.029 + 0.3).toFixed(2))}*</Typography>) : ''}

                        {cash ? (<Typography variant='subtitle2'>Cart Total: ${total.toFixed(2)}</Typography>) : (coupon ? <Typography variant='subtitle2' style={{color: '#fca311'}}><b>Cart Total: ${(Number(totalAfterDiscount * 0.029 + 0.3) + Number(totalAfterDiscount)).toFixed(2)}</b> </Typography>: <Typography variant='subtitle2' style={{color: '#fca311'}}><b>Cart Total: ${(Number(total * 0.029 + 0.3) + Number(total)).toFixed(2)}</b> </Typography>)}

                        {/* <Typography variant='h6'>Cart Total: ${cash ? (`${total}`): (`${((total) + (total * 0.029 + 0.3)).toFixed(2)}`)}</Typography> */}
                       
                        <div className="row mb-3">
                            <div className="col-md-8">
                                {!cash ? (
                                    <Button
                                        className={addressSaved ? classes.btn: classes.buttonDisabled}
                                        disabled={!addressSaved ? true : false}
                                        onClick={() => { 
                                            // handleClick();
                                            history.push('/payment')}}
                                    >Place Order</Button>
                                ) : 
                               ( 
                                <>
                                    <Button
                                        className={addressSaved ? classes.btn: classes.buttonDisabled}
                                        disabled={!addressSaved ? true : false}
                                        onClick={createCashOrder}
                                    >Place Order by Cash</Button>
                                    <Button
                                        className={addressSaved ? classes.btn: classes.buttonDisabled}
                                        disabled={!addressSaved ? true : false}
                                        onClick={createVenmoOrder}
                                    >Place Order by Venmo</Button>
                                </>
                               )}

                                <Button
                                    className={classes.btn}
                                    // disabled={products ? false : true}
                                    // onClick={emptyCart}
                                    component={Link}
                                    to='/cart'
                                    >
                                    Back to Cart
                                </Button>
                            </div>
                        </div>
                        {cash ? <Typography variant='subtitle2'>Cash/ Venmo Payment</Typography> : <Typography variant='subtitle2'>*Card Fee: 2.9% + 30&#162;</Typography>}
                        <Typography variant='subtitle2'>Don't forget to choose a date + time and press save button before placing an order</Typography>
                    </div>
                </div >
            </div>
        </>
    );

};

export default Checkout;
