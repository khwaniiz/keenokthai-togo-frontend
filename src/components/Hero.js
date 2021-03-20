import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {  Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    hero: {
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
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {

            fontSize: '3.75rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem'
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

const Hero = ({title}) => {
    const classes = useStyles();
   
    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero} style={{   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1612220926/jonny-clow-xZa4JUE7EdM-unsplash_dydmwi.jpg')`,}}>
                <Typography variant='h1' className={classes.headerFirst}>{title}</Typography>
            </Box>
            </>
    )
}

export default Hero
