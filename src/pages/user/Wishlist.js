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


const Wishlist = () => {
  const classes = useStyles();
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadWishlist = () =>
  getWishlist(user.token).then((res) => {
    // console.log(res);
    setWishlist(res.data.wishlist);
  });

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);



  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <>
        {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>My Wishlist</Typography>
            </Box>
    <div className="container-fluid">
      <div className="row mt-5 mb-5">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col-md-9">
          {wishlist.length === 0 ? (  <Typography variant='h6' >Your wishlist is currently empty</Typography>) : (wishlist.map((p) => (
            <div key={p._id} className={classes.wishlistContainer}>
              <Link to={`/product/${p.slug}`} className={classes.link}>{p.title}</Link>
              <IconButton
                onClick={() => handleRemove(p._id)}
                className="float-right"
                size="small"
              >
                <DeleteForeverIcon className="text-danger" />
              </IconButton>
            </div>
          )))   }
        </div>
      </div>
    </div>
    </>
  );
};

export default Wishlist;
