import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Card, Box, Grid } from '@material-ui/core';

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCards = []

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card>
                        <Box p={1}>
                            <Skeleton variant="rect" width='100%' height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>

                    </Card>
                </Grid>
            )
        }

        return totalCards
    }

    return (
        <Grid container spacing={5}>{cards()}</Grid>
    )


}

export default LoadingCard;