import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import ProductCard from '../components/cards/ProductCard'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Collapse, Checkbox, FormControlLabel } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
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

    listItems: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }

}));

const Shop = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]) // show options for sidebar
    const [categoryIds, setCategoryIds] = useState([]) // for backend
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");

    // dispatch
    let dispatch = useDispatch()
    let { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubs().then((res) => setSubs(res.data));
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
            <div key={c._id}>
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{ backgroundColor: 'transparent' }}
                            className="pb-2 pl-4 pr-4"
                            onChange={handleCheck}
                            color='#fca311'
                            value={c._id}
                            checked={categoryIds.includes(c._id)}
                            disableRipple

                        />
                    }
                    label={c.name}
                />
                <br />
            </div>
        ));

    // 4 handle check for categories
    const handleCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })

        //console.log(e.target.value)
        let inTheState = [...categoryIds]
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked)

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]

        if (foundInTheState === -1) {
            inTheState.push(justChecked)
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1)
        }

        setCategoryIds(inTheState)
        //console.log(inTheState)
        fetchProducts({ category: inTheState })

    }

    // 6. show products by sub category
    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: "pointer", fontFamily: 'Nunito', fontSize: '1rem', backgroundColor: '#fca311' }}
            >
                {s.name}
            </div>
        ));

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoryIds([]);
        fetchProducts({ sub });

    };


    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        if (openTwo === true) {
            setOpenTwo(false)
        } else {
            setOpenTwo(true)
        }

    };
    return (
        <>
            {/*==== Hero Section ===*/}
            <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>Search</Typography>
            </Box>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-5">
                        <Typography variant='h6' className="">Choose your filter</Typography>

                        <hr />
                        {/* Category */}
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >

                            <ListItem button onClick={handleClick} className={classes.listItems}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Category" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {showCategories()}
                                </List>
                            </Collapse>

                            {/* Sub Category */}
                            <ListItem button onClick={handleClick2}>
                                <ListItemIcon>
                                    <LocalOfferOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sub category" />
                                {openTwo ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openTwo} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {showSubs()}
                                </List>
                            </Collapse>

                        </List>


                    </div>

                    <div className="col-md-9 mt-5">
                        {loading ? (
                            <CircularProgress color='secondary' />
                        ) : (
                            <>
                                <Typography variant='h6'>Products</Typography>
                                <hr />
                                </>
                            )}

                        {products.length < 1 && <Typography variant='h6' color='secondary'>No product found...</Typography>}

                        <Grid container direction='row' justify='center' spacing={5}>
                            {products.map((p) => (
                                <Grid item key={p._id} xs={12} sm={6} >
                                    <ProductCard product={p} />
                                </Grid>

                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop;