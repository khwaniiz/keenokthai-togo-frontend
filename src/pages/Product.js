import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProduct, productStar, getRelated } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import ProductCard from '../components/cards/ProductCard'
import LoadingCard from '../components/cards/LoadingCard'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Container, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subHeader: {
        fontSize: '30px'
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1611980714/payoon-gerinto-jF9AJ6eQJlk-unsplash_posx7m.jpg')`,
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
}));


const Product = ({ match }) => {
    const classes = useStyles();
    const { user } = useSelector(state => ({ ...state }))
    const [product, setProduct] = useState([])
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(false)
    const [star, setStar] = useState(0);
    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    }, [slug])

    const loadSingleProduct = () => {
        setLoading(true)
        getProduct(slug).then(res => {
            setProduct(res.data)
            //load related products
            getRelated(res.data._id)
                .then(res => setRelated(res.data))
        })
        setLoading(false)
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        //console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            //console.log("rating clicked", res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };

    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>{product.title}</Typography>
            </Box>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct
                        product={product}
                        onStarClick={onStarClick}
                        star={star}
                    />
                </div>


                <div className="row">
                    <div className="col text-center pt-5 pb-5">
                        <hr />
                        <Typography variant="h5" component="h2">Related Product</Typography>
                        <hr />
                    </div>
                </div>

                <div className="row pb-5">
                    <Container maxWidth='lg'>
                        {loading ? <LoadingCard count={3} /> : (
                            <Grid container spacing={5}>
                                {related.length ? related.map((r) => (
                                    <Grid item xs={12} sm={6} md={4} key={r._id}>
                                        <ProductCard product={r} />
                                    </Grid>
                                )) :

                                    <div className="text-center col">  <Typography component="p" >No products found</Typography></div>


                                }

                            </Grid>)}
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Product;