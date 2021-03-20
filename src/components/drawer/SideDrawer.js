import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultPhoto from '../../assests/defaultPhoto.png';

import { Drawer, Button, List, Typography, Divider, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { findLastIndex } from "lodash";

const useStyles = makeStyles((theme) => ({

    paper: {
        backgroundColor: '#fff',
        color: 'rgba(9, 9, 9, 0.8)',
        fontFamily: 'Nunito'
    },
    list: {
        width: 250,
        ...theme.mixins.toolbar,
        marginTop: '5rem',

    },
    imageStyle: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Nunito',
        padding: '.5rem',
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
        marginTop: "1.5rem",
        '&:hover': {
            color: '#fca311',
            border: '1px #fca311 solid',
        }

    },


}));

const SideDrawer = ({ children }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    return (
        <Drawer
            open={drawer}
            anchor='right'
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}
            classes={{ paper: classes.paper }}
        >

            <div className={classes.list}>
                {/* <Typography align='center' variant="h5" color='#fff' gutterBottom>{cart ? (`${cart.length} Product`) : 'Cart / 0 product'}</Typography>
                <Divider /> */}
                <Grid container direction="column">
                    {cart ? (cart.map((p) => (
                        <Grid item key={p._id}>
                            { p.images[0] ?
                                (
                                    <Box className={classes.boxContainer}>

                                        <Box alignSelf="flex-start" style={{ marginRight: '.5rem' }}>
                                            <img src={p.images[0].url} className={classes.imageStyle} />
                                        </Box>
                                        <Box alignSelf="flex-start">
                                            <b>{p.title}</b> <br />
                                            {p.typeOfChoice ? <><Box alignSelf="flex-start">+{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</Box>  </>: ''}
                                            {p.instructions ? <Box alignSelf="flex-start">{p.instructions}</Box> : ''}
                                            {p.count} x ${p.price.toFixed(2)}
                                        </Box>
                                      
                                    
                                    </Box>

                                ) : (
                                    <Box className={classes.boxContainer}>
                                        <Box alignSelf="flex-start" style={{ marginRight: '.5rem' }}>
                                            <img src={defaultPhoto} className={classes.imageStyle} />
                                        </Box>
                                        <Box alignSelf="flex-start">
                                            <b>{p.title}</b> <br />
                                            {p.typeOfChoice ? <><Box alignSelf="flex-start">+{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</Box></>: ''}
                                            {p.instructions ? <Box alignSelf="flex-start">{p.instructions}</Box> : ''}
                                            {p.count} x ${p.price.toFixed(2)}
                                        </Box>
                                    </Box>
                                )}


                        </Grid>


                    ))) : ('Empty')}

                    <Divider variant="middle" style={{ marginTop: '1rem' }} />
                    <Box style={{ margin: '1rem' }}>
                        <Typography align='right'>Total: ${cart ? getTotal().toFixed(2) : '0'}</Typography>
                    </Box>
                    <Divider variant="middle" />
                    <Box align='center' alignContent='flex-end'>
                        <Button
                            variant="outlined"
                            onClick={
                                () => dispatch({
                                    type: 'SET_VISIBLE',
                                    payload: false
                                })
                            }
                            component={Link}
                            to='/cart'
                            className={classes.btn}

                        >Go To Cart</Button>
                    </Box>

                    <Box align='center' alignContent='flex-end'>
                        <Button
                            variant="outlined"
                            onClick={
                                () => dispatch({
                                    type: 'SET_VISIBLE',
                                    payload: false
                                })
                            }
                            component={Link}
                            to='/menu'
                            className={classes.btn}

                        >Back To Menu</Button>
                    </Box>
                </Grid>
            </div>


        </Drawer >
    )
};

export default SideDrawer;
