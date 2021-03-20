import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import { getProducts, getProductsCount } from '../../functions/product'
import ProductCard from '../cards/ProductCard'
// import Jumbotron from '../cards/Jumbotron'
import LoadingCard from '../cards/LoadingCard'

const useStyles = makeStyles((theme) => ({
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    root: {
        '& .Mui-selected': {
            backgroundColor: 'rgba(9, 9, 9, 0.8)',
            color: '#fff',
        },
    }

}));



const BestSellers = () => {
    const classes = useStyles();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [productsCount, setProductsCount] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        let isMounted = true
        loadAllProducts()
        return () => { isMounted = false };
    }, [page])

    useEffect(() => {
        getProductsCount()
            .then(res => setProductsCount(res.data))
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        // sort, order, page
        getProducts('sold', 'desc', page)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    const handleChange = (e, value) => {
        setPage(value)
    }



    return (<div>

        <Container maxWidth='lg' className={classes.blogsContainer}>
            {loading ? <LoadingCard count={3} /> : (
            
            <Grid container spacing={5}>
                {products.filter(p => p.quantity !== 0).map(p=> (
                     <Grid item xs={12} sm={6} md={4} key={p._id}>
                     <ProductCard product={p} />
                 </Grid>
                ))}

                {products.filter(p => p.quantity === 0).map(p=> (
                     <Grid item xs={12} sm={6} md={4} key={p._id}>
                     <ProductCard product={p} />
                 </Grid>
                ))} 
            </Grid>)}
        </Container>

        <Box my={4} className={classes.paginationContainer}>
            <Pagination
                page={page}
                count={Math.ceil((productsCount / 3))}
                onChange={handleChange}
                className={classes.root}
            />
        </Box>

    </div>);
};

export default BestSellers;
