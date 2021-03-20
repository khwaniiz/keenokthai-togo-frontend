import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

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
    wishlistContainer: {
        backgroundColor: '#f4f4f4f4;',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '10px',
        textAlign: 'center'
    },
    link: {
      fontFamily: 'Nunito',
      fontSize: '1rem',
      color: '#000',
      '&:hover': {
        color: '#fca311' 
      }
    }

}));


const AccountIssue = () => {
  const classes = useStyles();
 
  const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  return (
    <>
        {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>Account Issue</Typography>
            </Box>
    <div className="container-fluid">
      <div className="row mt-5 mb-5">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col-md-9">

       <div className={classes.wishlistContainer}>
            <Typography variant='subtitle2'>If you have an issue with your account, please reach out to us at <a className={classes.link}href="mailto:keenokthai@gmail.com" target='_blank'>keenokthai@gmail.com</a></Typography>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountIssue;
