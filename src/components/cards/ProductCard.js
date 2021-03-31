import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import { useSelector } from 'react-redux'
// import _ from "lodash";
import defaultPhoto from '../../assests/defaultPhoto.png'
// import { showAverage } from '../../functions/rating'

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton,  Tooltip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({

    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
        marginBottom: '2em',
        position: 'relative'
    },
    media: {
        height: 250,
    },
    mediaDisabled: {
        height: 250,
        filter: 'contrast(30%)',
    },
    outFont: {
        position: 'absolute',
        top: "30%",
        width: "100%",
        textAlign: "center",
        color: "white",
        backgroundColor: "none",
        fontFamily: 'Nunito',
        fontSize: '2rem',
        textShadow: '3px 3px 3px black'
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex",
    },


}));

const ProductCard = ({ product }) => {
    const classes = useStyles();
    const { title, description, images, slug } = product
    const [tooltip, setTooltip] = useState('Click to add')

    // redux
    //const { user, cart } = useSelector(state => ({ ...state }))
    //const dispatch = useDispatch()

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])

    // const handleAddToCart = () => {

    //     create cart array
    //     let cart = [];


    //     if (typeof window !== "undefined") {
    //         // if cart is in local storage GET it
    //         if (localStorage.getItem("cart")) {
    //             cart = JSON.parse(localStorage.getItem("cart"));
    //         }
    //         // push new product to cart
    //         cart.push({
    //             ...product,
    //             count: 1,
    //         });
    //         // remove duplicates
    //         let unique = _.uniqWith(cart, _.isEqual);
    //         // save to local storage
    //         // console.log('unique', unique)
    //         localStorage.setItem("cart", JSON.stringify(unique));
    //         setTooltip('Added')

    //         // add to redux state
    //         dispatch({
    //             type: "ADD_TO_CART",
    //             payload: unique
    //         })

    //         // show cart items in side drawer
    //         dispatch({
    //             type: "SET_VISIBLE",
    //             payload: true
    //         })

    //     }
    // };

    return (
        <Card className={classes.card} variant='outlined'>
            {/* <CardHeader
                // action={
                //     product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pt-1 pb-3'>No rating yet</div>
                // }
            /> */}

            <CardActionArea
                component={Link} to={`/product/${slug}`}>
                <CardMedia
                    component="div"
                    className={product.quantity === 0 || product.quantity < 0 ? classes.mediaDisabled : classes.media}
                    image={images && images.length ? images[0].url : defaultPhoto}
                    title={title}
                />
               {product.quantity === 0 || product.quantity < 0 ? (  <Typography
                    gutterBottom
                    className={classes.outFont}
                >
                    Out of Stock
                </Typography>) : null}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontFamily: 'Nunito'}}>
                        {`${description && description.substring(0, 30)}...`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                    <Box>

                        <Typography variant='subtitle2' component='p'>${product.price.toFixed(2)}</Typography>
                        <Typography variant='subtitle2' color='textSecondary' component='p'>{product.quantity === 0 ? 'Out of stock' : 'In stock'}</Typography>

                    </Box>
                </Box>
                <Box>
                    {/* 
                    <Tooltip
                        title='View product' placement="top">
                        <IconButton color='primary' component={Link} to={`/product/${slug}`}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip> */}

                    <Tooltip
                        title={product.quantity === 0 ? 'Out of stock' : tooltip} placement="top">
                        <span>
                            <IconButton color='secondary'
                                // onClick={() => { handleAddToCart() }}
                                component={Link} to={`/product/${slug}`}
                                disabled={product.quantity === 0}
                            >
                            
                                <AddShoppingCartIcon />
                            </IconButton>
                        </span>
                    </Tooltip>

                </Box>
            </CardActions>
        </Card >
    )
}

export default ProductCard;