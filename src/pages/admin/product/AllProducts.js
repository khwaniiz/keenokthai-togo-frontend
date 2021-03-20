import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import AdminNav from '../../../components/nav/AdminNav'
import Hero from '../../../components/Hero'
import { getProductsByCount, removeProduct } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'

const useStyles = makeStyles((theme) => ({


}));

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const classes = useStyles();

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (slug) => {
        // let answer = window.confirm("Delete?");
        if (window.confirm("Delete?")) {
            // console.log("send delete request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`)
                })

                .catch((err) => {
                    if (err.response.status === 400) { toast.warning(err.response.data); }
                    console.log(err);
                });
        }
    };

    return (
        <>
            <Hero title={'Update / Delete Product'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>

                <div className="col-md-9 ">
                    {loading ? (<Typography variant='h6' className='text-danger'>Loading...</Typography>) : (

                        <Typography variant='h6' >All Products</Typography>

                    )}
                     <Grid container direction='row' justify='center' spacing={5}>
                        {products.map(product => (
                            <Grid item  key={product._id} xs={12} sm={6}>
                                <AdminProductCard product={product} handleRemove={handleRemove} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
        </>
    );
};

export default AllProducts;
