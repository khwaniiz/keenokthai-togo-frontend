import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub'

import { Typography, Box, Grid, Container, Button } from '@material-ui/core';

const SubList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSubs()
            .then(res => {
                setSubs(res.data)
                setLoading(false)
            })
    }, [])

    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
                <Link to={`/sub/${s.slug}`}>{s.name}</Link>

            </div>
        ));

    return (

        <Container maxWidth='lg'>
            <Grid container spacing={5}>
                {loading ? <h4>Loading...</h4> : showSubs()}
            </Grid>
        </Container>


    )
}

export default SubList