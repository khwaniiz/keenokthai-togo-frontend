import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import defaultPhoto from '../../assests/defaultPhoto.png'


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
        marginBottom: '2em'
    },
    media: {
        height: 250,

    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }

}));

const AdminProductCard = ({ product, handleRemove }) => {

    const { title, description, price, images, slug } = product
    const classes = useStyles();
    const [tooltip, setTooltip] = useState('Delete')

    return (


        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={images && images.length ? images[0].url : defaultPhoto}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${description && description.substring(0, 50)}...`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                    <Box>
                        <Typography variant='subtitle2' component='p'>${price.toFixed(2)}</Typography>
                        <Typography variant='subtitle2' color='textSecondary' component='p'>{product.quantity < 1 ? 'Out of stock' : 'In stock'}</Typography>
                    </Box>
                </Box>
                <Box>
                <Tooltip
                        title='Edit product' placement="top">
                    <IconButton color='primary' component={Link} to={`/admin/product/${slug}`}>
                        <EditOutlinedIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip
                        title={product.quantity < 1 ? 'Out of stock' : tooltip} placement="top">
                    <IconButton color='secondary' onClick={() => handleRemove(slug)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    </Tooltip>
                </Box>
            </CardActions>
        </Card>



    )
}

export default AdminProductCard;