import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon'
import { IconButton } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AdminNav from "../../../components/nav/AdminNav";
import Hero from '../../../components/Hero'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Box, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontFamily: 'Nunito',
        fontSize: '1rem',
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
    inputContainer: {
        marginBottom: '2rem',
        
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        
    }, 
    btn: {
        color: '#fca311',
    

    },
    label: {
        fontFamily: 'Nunito',
        fontWeight: '.1rem'
    },
    option: {
         fontFamily: 'Nunito',
         color: '#fca311',
    
    }

}));


const CreateCouponPage = () => {
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)
    const classes = useStyles();    

    // redux
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadAllCoupons()
    }, [])

    const loadAllCoupons = () => getCoupons().then(res => setCoupons(res.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // console.log(name, expiry, discount)
        createCoupon({ name, expiry, discount }, user.token)
            .then(res => {
                setLoading(false)
                loadAllCoupons()
                setName('')
                setExpiry('')
                setDiscount('')
                toast.info(`${res.data.name} coupon is created`)
            })
            .catch(err => console.log('create coupon error', err))
    }

    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons(); // load all coupons
                    setLoading(false);
                    toast.error(`Coupon "${res.data.name}" deleted`);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
         <Hero title={'Coupons'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>
                         <div className="col-md-9">
                    {loading ? (
                        <Typography variant='h6' color='secondary'  className="mb-3">Loading...</Typography>
                    ) : (
                        <Typography variant='h6' className="mb-3">Coupon</Typography>
                        )}

                    <form onSubmit={handleSubmit}>
                    <Box className={classes.inputContainer}>
                            <TextField
                                type="text"
                                InputProps={{
                                    className: classes.input,
                                }}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                label='Name of coupon'
                                autoFocus
                                required
                                fullWidth
                            />
                        </Box>

                        <Box className={classes.inputContainer}>
                            <TextField
                                type="text"
                                InputProps={{
                                    className: classes.input,
                                }}
                                label='Discount (%)'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                autoFocus
                                required
                                fullWidth
                            />
                        </Box>

                        <Box className={classes.inputContainer}>
                            <label >Expiry</label>
                            <br />
                            <DatePicker
                                className={classes.input}
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </Box>

                        <Button variant='outlined' color='secondary' onClick={handleSubmit} className={classes.btn}>Save</Button>

                    </form>

                    <br />
                    <Typography variant='h6'>Total Coupon: {coupons.length}</Typography>

                    <TableContainer component={Paper} variant='outlined'>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>

                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Expiry</StyledTableCell>
                    <StyledTableCell align="center">Discount</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                            {coupons.map((c) => (
                                <StyledTableRow key={c._id}>
                                    <StyledTableCell align="center">{c.name}</StyledTableCell>
                                    <StyledTableCell align="center">{new Date(c.expiry).toLocaleDateString()}</StyledTableCell>
                                    <StyledTableCell align="center">{c.discount} %</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton aria-label="delete"
                                            onClick={() => handleRemove(c._id)}>
                                            <DeleteOutlineOutlinedIcon
                                            />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                       </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        </div>
        </>
    );
};
export default CreateCouponPage;
