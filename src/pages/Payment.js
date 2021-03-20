import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

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

}));

// load stripe outside of components render to avoid recreating strip object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
    const classes = useStyles();
    const theme = useTheme()
    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero} >
                <Box m={2} textAlign="center">
                    <Typography variant='h1' className={classes.headerFirst}>Checkout</Typography>
                </Box>
            </ Box>
            <div className="container pt-5 text-center">
                <Typography variant='h6' style={{ marginBottom: '1rem' }}>Complete your purchase</Typography>
                <Elements stripe={promise}>
                    <div className="col-md-8 offset-md-2">
                        <StripeCheckout />
                    </div>
                </Elements>
            </div>
        </>
    )
}

export default Payment