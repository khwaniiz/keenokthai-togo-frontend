import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import _, { set } from "lodash";
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import StarRating from 'react-star-ratings'

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, CardHeader, Button, Tabs, Tab, AppBar, Tooltip, MenuItem, FormControl, Select,InputLabel, TextField } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import defaultPhoto from '../../assests/defaultPhoto.png'
// import ProductListItems from './ProductListItem'
// import RatingModal from '../modal/RatingModal'
// import { showAverage } from '../../functions/rating'
import { addToWishlist } from '../../functions/user'

function TabPanel(props) {

    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '1rem',
        width: '150px'
    },
    card: {
        maxWidth: "100%",
        marginBottom: '2em',
        
    },

    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },

    button: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),

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
        },
    },

    buttonDisabled: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),

        fontFamily: 'Nunito',
        textTransform: 'none',
        borderRadius: '200px',
        border: '1px #fca311 solid',
        color: '#fca311',
        fontSize: '1rem',
        backgroundColor: '#efefefef',
        padding: '5px 15px',
        margin: "1.5rem 1.5rem 0 0",
    },

    media: {
        height: 450,

    },
    expand: {
        marginLeft: 'auto',
        color: '#000',
        fontFamily: 'Nunito'
    },
    label: {
        textTransform: 'capitalize',
    },



}));

// children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const classes = useStyles();
    const { title,
        description,
        images,
        slug,
        price,
        category,
        subs,
        pickup,
        quantity,
        sold,
        _id,
        ingredients,
        choices,
        typeOfChoice,
        instructions
    } = product

    const [value, setValue] = useState(0);
    const [extraPrice, setExtraPrice] = useState(0)
    const [selectedChoice, setSelectChoice] = useState('')
    const [specialInstructions, setSpecialInstructions] = useState('')
    const [tooltip, setTooltip] = useState('Click to add')

    // redux
    const { user, cart } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()

    // router
    // let history = useHistory()

    //console.log('product.choices', product.choices)
    const handleAddToCart = () => {

        if(product.choices == 0 || selectedChoice) {
             // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                price: price + extraPrice,
                typeOfChoice: selectedChoice,
                extraCharge: extraPrice,
                instructions: specialInstructions,
                count: 1,
            });

           // console.log('cart from single product', cart)
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
           // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            setTooltip('Added')

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })

            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true
            })

        }

        setSpecialInstructions('')
        } else {
            toast.warning('Please select choice')
        }
       
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddToWishlist = e => {
        e.preventDefault()
        addToWishlist(product._id, user.token)
            .then(res => {
                //console.log('ADDED TO WISHLIST', res.data)
                toast.success('Added to wishlist')
                //history.push("/user/wishlist");
            })
    }

    const handleChoiceChange = (e) => {
        e.preventDefault();
        setSelectChoice(e.target.value.name)
        setExtraPrice(e.target.value.price)
        
        //console.log('selectedChoice', selectedChoice, 'extraChoice', extraPrice)
    };

    const handleSpecialInstructions = (e) => {
        e.preventDefault();
        setSpecialInstructions(e.target.value)
    }


    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map(image => <img src={image.url} key={image.public_id} alt={image.url} />)}
                    </Carousel>
                ) : (
                        <Card variant='outlined'>
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={defaultPhoto}

                            />
                        </Card>
                    )}
            </div>

            <div className="col-md-5">
                <Card className={classes.card} variant='outlined'>
                    <CardHeader
                        title={title}
                        style={{fontFamily: 'Nunito'}}
                    />
                    {/* <CardContent>
                        {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pt-1 pb-3'>No rating yet</div>}
                    </CardContent> */}
                    <CardContent>
                        <CardActions disableSpacing>
                            <Typography style={{fontFamily: 'Nunito'}}>Price</Typography>
                            {extraPrice ?  <Typography className={classes.expand}>${(price + extraPrice).toFixed(2)}</Typography> : <Typography className={classes.expand}>${price ? price.toFixed(2) : ''}</Typography>}
                        </CardActions>
                        <CardActions disableSpacing>
                            {category && (
                                <>
                                    <Typography style={{fontFamily: 'Nunito'}}>Category</Typography>

                                    <Typography className={classes.expand} component={Link} to={`/category/${category.slug}`}>
                                        {category.name}
                                    </Typography>
                                </>
                            )}
                        </CardActions>
                        <CardActions disableSpacing>
                            {subs && (
                                <>
                                    <Typography style={{fontFamily: 'Nunito'}}>Sub Categories</Typography>
                                    {subs.map((s => (
                                        <Typography className={classes.expand} component={Link} key={s._id}
                                            to={`/sub/${s.slug}`}>
                                            {s.name}
                                        </Typography>
                                    )))}
                                </>
                            )}
                        </CardActions>
                        <CardActions disableSpacing>
                            <Typography style={{fontFamily: 'Nunito'}}>Pickup</Typography>
                            <Typography className={classes.expand}>{pickup}</Typography>
                        </CardActions>

                        <CardActions disableSpacing>
                            <Typography style={{fontFamily: 'Nunito'}}>Available</Typography>
                            <Typography className={classes.expand}>{quantity === 0 || quantity < 0 ? 'Out of stock' : 'Yes'}</Typography>
                        </CardActions>
                        {product.choices  == 0 ? '' : <>
                            <CardActions disableSpacing>
                            <Typography style={{fontFamily: 'Nunito'}}>Choice of </Typography>
                            <Box className={classes.expand}>
                                <FormControl className={classes.inputContainer}>
                                <InputLabel id="choice of">Please select</InputLabel>
                                    <Select
                                    id='choice of'
                                    onChange={handleChoiceChange}
                                    defaultValue={value.name || ''}
                                    name="choice"
                                    style={{
                                        fontFamily: "Nunito",
                                        color: '#fca311',
                                        fontWeight: 'bold'
                                    }}
                                    
                                                          
                                    >
                                    {choices && choices.map((c,i) => (
                                        <MenuItem key={i} value={c} style={{color: '#fca311',}}>{c.name} ${c.price.toFixed(2)}</MenuItem>
                                    ))}
                                </Select>
                               
                            </FormControl>   
                            </Box>
                        </CardActions>
                        </>}
                        <CardActions disableSpacing>
                            <Typography style={{fontFamily: 'Nunito'}}>Special Instructions</Typography>
                            <Box className={classes.expand}>
                            <TextField
                                label="Add your instructions..."
                                multiline
                                rowsMax={4}
                                variant="outlined"
                                value={specialInstructions}
                                onChange={handleSpecialInstructions}
                                style={{fontFamily: 'Nunito'}}
                            />
                            </Box>
                        </CardActions>
                        {/* <CardActions disableSpacing>
                            <Typography>Sold</Typography>
                            <Typography className={classes.expand}>{sold}</Typography>
                        </CardActions> */}

                    </CardContent>
                    <CardActions size='small' className={classes.cardActions}>

                        <Box className={classes.boxButton}>
                           
                            <Tooltip
                                title={quantity === 0 ? '': tooltip} placement="top" disableHoverListener={quantity === 0 || quantity < 0 ? true : false}>
                                <span>
                                    <Button
                                        variant="outlined"
                                        disabled={quantity === 0 || quantity < 0 ? true : false}
                                        className={quantity === 0 || quantity < 0 ? classes.buttonDisabled: classes.button}
                                        startIcon={<AddShoppingCartIcon />}
                                        color='secondary' onClick={() => { handleAddToCart() }}
                                    >
                                        Add to cart
                            </Button>
                                </span>
                            </Tooltip>

                            <Button
                                variant="outlined"
                                disabled={user ? false : true}
                                className={user ? classes.button : classes.buttonDisabled}
                                startIcon={<FavoriteBorderIcon />}
                                color='primary'
                                onClick={handleAddToWishlist}
                            >
                                Add to wishlist
                            </Button>
                            {/* <RatingModal>
                                <StarRating
                                    name={_id}
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    isSelectable={true}
                                    starRatedColor="red"
                                    starDimension="30px"
                                />
                            </RatingModal> */}

                        </Box>

                    </CardActions>
                </Card>
                <Box>
                    <AppBar position="static" style={{fontFamily: 'Nunito'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Description" {...a11yProps(0)} />
                            <Tab label="Ingredients" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {description}
                    </TabPanel>
                    <TabPanel value={value || ''} index={1}>
                       {ingredients}
      </TabPanel>

                </Box>
            </div>

        </>
    )
}

export default SingleProduct;