import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import ProductCard from '../components/cards/ProductCard'

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, Box, Grid } from '@material-ui/core';
import LoadingCard from '../components/cards/LoadingCard'

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
        height: '72vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: -1,
        [theme.breakpoints.down('md')]: {

             height: '50vh',
        }
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

    mainContainer: {
        margin: '3rem auto 3rem auto'

    },

    listItems: {
        borderRadius: '200px',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#fca311',
            borderRadius: '200px',
        },
        '&.Mui-selected': {
            backgroundColor: '#fca311',
            color: '#fff',
            borderRadius: '200px',
        }
    },

    listItemTexts: {
        fontFamily: 'Nunito',
        textAlign: 'center'

    },

    nav: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Nunito',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    }
}));

const Menu = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]) // show options for sidebar
    const [categoryIds, setCategoryIds] = useState([]) // for backend
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1);

    // dispatch
    let dispatch = useDispatch()
    let { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
        window.scrollTo(0, 0)
    }, []);

    // 1 load products by default on page load
    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(12)
            .then(p => {
                setProducts(p.data)
                setLoading(false)
            })
    }

    // 2 load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
            if (!text) {
                loadAllProducts()
            }
        }, 300)

        return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
            .then(res => {
                setProducts(res.data)
            })
    }

    // 4 load products based on category
    // show categories in a list of checkbox
    const showCategories = () =>
        categories.map((c) => (
            <div
                key={c._id}
                style={{ margin: '.5rem' }}
            >
                <ListItem
                    button
                    onClick={() => handleCheck(c, c._id)}
                    selected={selectedIndex === c._id}
                    className={classes.listItems}
                >

                    <ListItemText><Typography className={classes.listItemTexts}>{c.name}</Typography></ListItemText>
                </ListItem>


            </div >
        ));

    const handleCheck = (c, index) => {
        setCategoryIds(c)
        setSelectedIndex(index);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        //console.log("c", c);
        fetchProducts({ category: c });
    }


    return (
        <>

            {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>Menu</Typography>
            </Box>
            <div className="container-fluid">
                <Grid container direction='row' justify='center' className={classes.mainContainer}>
                    <Grid item>
                        <List className={classes.nav}>
                            {showCategories()}
                        </List>
                    </Grid>

                </Grid>

                {loading && products.length < 1 && <Typography variant='h6' color='secondary'>No product found...</Typography> ? (
                    <LoadingCard count={3} />
                ) : (
                        <Grid container direction='row' justify='center' spacing={5}>
                            {products.filter(p => p.quantity !== 0).map((p) => (
                                 <Grid item key={p._id} xs={12} sm={6} md={3} >
                                 <ProductCard product={p} />
                             </Grid>
                            ))}
                             {products.filter(p => p.quantity === 0).map((p) => (
                                 <Grid item key={p._id} xs={12} sm={6} md={3} >
                                 <ProductCard product={p} />
                             </Grid>
                            ))}
                        </Grid>
                    )}




                {/* <div className="row">
                    <div className="col-md-3">
                        <List component="nav" className={classes.nav}>
                            {showCategories()}
                        </List>

                    </div>

                    <div className="col-md-9">

                        {loading && products.length < 1 && <p>No products found</p> ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (

                                <div className="row pb-5">
                                    {products.map((p) => (
                                        <div key={p._id} className="col-md-4 mt-3">
                                            <ProductCard product={p} />
                                        </div>

                                    ))}
                                </div>
                            )}


                    </div>


                </div> */}
            </div>
        </>
    )
}

export default Menu;