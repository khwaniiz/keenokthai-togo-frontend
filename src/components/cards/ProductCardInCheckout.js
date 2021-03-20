import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalImage from 'react-modal-image'
import defaultPhoto from '../../assests/defaultPhoto.png'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TableRow, TableCell, TextField, IconButton, Box } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,

    },
    body: {
        fontSize: '1rem',
        fontFamily: 'Nunito',
        [theme.breakpoints.down('xs')]: {
            fontSize: '.75rem',
        }

    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    img: {
        height: '50px',
        width: '100px'
    },

    tablePhoto: {
        width: '100px',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    inputQuantity: {
        width: '3rem',
        paddingTop: 0,
        border: 'none',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
        borderRadius: '4px'
    },
    boxPhoto: {
        display: 'flex',
        flexDirection: 'row'
    }
}));


const ProductCardInCheckout = ({ p }) => {
    const classes = useStyles();
    let dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        //console.log('available quantity: ', p.quantity)

        let count = e.target.value < 0 ? 1 : e.target.value

        if (count > p.quantity) {
            toast.error(`Max available quantity:  ${p.quantity}`)

            return
        }
        let cart = []

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((product, i) => {
                if (product._id === p._id && product.typeOfChoice === p.typeOfChoice && product.instructions === p.instructions) {
                    cart[i].count = count
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handleRemove = () => {
        //console.log(p._id)
        let cart = []

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1)
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }



    return (

        <StyledTableRow key={p._id}>
              <StyledTableCell align="center" style={{width: '20px'}}>
                <IconButton
                    color="default"
                    onClick={handleRemove}
                >
                    <HighlightOffIcon />
                </IconButton>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" className={classes.tablePhoto} >
                {p.images.length ? <ModalImage small={p.images[0].url} large={p.images[0].url}  hideDownload={true} hideZoom={true} className={classes.img}/> : <ModalImage small={defaultPhoto} large={defaultPhoto}  hideDownload={true}
            hideZoom={true} className={classes.img}/>}
            </StyledTableCell>
            <StyledTableCell align="center">
                {p.title}
                {p.typeOfChoice ? <><br />+{p.typeOfChoice} ${p.extraCharge.toFixed(2)}</> : ''} 
                {p.instructions ? <><br />{p.instructions}</> : ''}
            </StyledTableCell>
            <StyledTableCell align="center">
                ${p.price.toFixed(2)}
            </StyledTableCell>
            <StyledTableCell align="center">
                <div style={{ paddingTop: '0' }}>
                    <TextField
                        type="number"
                        className={classes.inputQuantity}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={p.count}
                        onChange={handleQuantityChange}
                    />


                </div>

            </StyledTableCell>
            <StyledTableCell align="center">
            ${(p.price * p.count).toFixed(2)}
            </StyledTableCell>

        </StyledTableRow >


    );
};

export default ProductCardInCheckout;
