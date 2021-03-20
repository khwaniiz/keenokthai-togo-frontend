import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Typography, Box, Tooltip } from '@material-ui/core';

import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

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
        
       '&:hover': {
            color: '#fca311',
             border: '1px #fca311 solid',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '.65rem'
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
    link: {
        fontFamily: 'Nunito',
        fontSize: '1rem',
        color: '#fff',
        '&:hover': {
          color: '#fca311' 
        }
      },

}));

const Cart = ({ history }) => {
    const classes = useStyles();
    const theme = useTheme()
    const { cart, user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

     useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  

    const getTotal = () => {
       if(cart)  {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
       } else {
           return 0
       }
    }

    const saveOrderToDb = () => {
        // console.log('cart', JSON.stringify(cart, null, 4))
        dispatch({
            type: 'CASH_PAYMENT',
            payload: false
        })

        dispatch({
            type: 'VENMO_PAYMENT',
            payload: false
        })
        userCart(cart,user.token)
            .then(res => {
                //console.log('cart post res', res)
                if (res.data.ok) history.push("/checkout");
            })
            .catch(err => console.log('cart save error'))
    };


    const saveCashOrderToDb = () => {
        // console.log('cart', JSON.stringify(cart, null, 4))
        dispatch({
            type: 'CASH_PAYMENT',
            payload: true
        })

        dispatch({
            type: 'VENMO_PAYMENT',
            payload: true
        })

        userCart(cart, user.token)
            .then(res => {
                //console.log('cart post res', res)
                if (res.data.ok) history.push("/checkout");
            })
            .catch(err => console.log('cart save error'))
    };

    const showCartItems = () => {
        return (
            <TableContainer component={Paper} variant='outlined'>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center" className={classes.tablePhoto}></StyledTableCell>
                            <StyledTableCell align="center">Product</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Quantity</StyledTableCell>
                            <StyledTableCell align="center">Amount</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((p) => (
                            <ProductCardInCheckout key={p._id} p={p} />
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        )
    }

    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Box m={2} textAlign="center">
                    <Typography variant='h1' className={classes.headerFirst}>Shopping Cart</Typography>
                </Box>
            </Box>
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-5 mb-5">
                    <Typography variant='h6' className="mb-3">Order Summary</Typography>
                        {!cart ? (
                            <Typography variant='h6'>No products in cart.
                                <Link to='/menu' className='p-2' style={{ color: '#fca311' }}>Continue Shopping</Link>
                            </Typography>
                        ) : (
                                showCartItems()
                            )}
                    </div>
                </div>

         {/* ============================================ */}
         <div className="row">
            <div className="col-md-4" style={{marginLeft: 'auto'}}>

                    <hr />
                    <Box display="flex" justifyContent="flex-end">
                    <Typography variant='h5' style={{ fontSize: '1.25rem'}}>Sub Total: {cart ? <b>${getTotal().toFixed(2)}</b> : 0}</Typography>
                    </Box>
                  
                    <hr />
                    {user ? (
                           <Box display="flex" justifyContent="flex-end">
                                <Tooltip disableFocusListener title="*Card Fee: 2.9% + 30&#162;" placement="top" style={{fontFamily: 'Nunito'}}>
                            <Button variant="outlined"
                                onClick={saveOrderToDb}
                                className={getTotal() === 0 ? classes.buttonDisabled : classes.btn}
                                disabled={getTotal() === 0 ? true : false}

                            >
                                Pay By Card</Button>
                                </Tooltip>
                            <Button variant="outlined"
                                onClick={saveCashOrderToDb}
                                className={getTotal() === 0 ? classes.buttonDisabled : classes.btn}
                                disabled={getTotal() === 0 ? true : false}
                                style={{marginLeft: '1rem'}}
                            >
                                Pay By Cash / Venmo</Button>
                          
                        </Box>
                    ) : (
                            <Button variant="outlined" className={classes.btn}><Link to='/sign-in' className={classes.link}>Sign in to Checkout</Link></Button>
                        )}
                        </div>
                </div>
            </div>
        </>
    )
}
export default Cart