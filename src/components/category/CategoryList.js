import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'

import { Typography, Box, Grid, Container, Button } from '@material-ui/core';

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCategories()
            .then(c => {
                setCategories(c.data)
                setLoading(false)
            })
    }, [])

    const showCategories = () =>
        categories.map((c) => (
            <div
                key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
                <Link to={`/category/${c.slug}`}>{c.name}</Link>

            </div>
        ));

    return (

        <Container maxWidth='lg'>
            <Grid container spacing={5}>
                {loading ? <h4>Loading...</h4> : showCategories()}
            </Grid>
        </Container>


    )
}

export default CategoryList