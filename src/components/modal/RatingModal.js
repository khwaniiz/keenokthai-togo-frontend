import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textTransform: 'capitalize',
    },

}));

const RatingModal = ({ children }) => {
    const classes = useStyles();
    const { user } = useSelector((state) => ({ ...state }))
    const [open, setOpen] = React.useState(false);
    let history = useHistory();
    let { slug } = useParams();


    const handleClickOpenModal = () => {
        if (user && user.token) {
            setOpen(true);
        } else {
            history.push({
                pathname: '/sign-in',
                state: {
                    from: `/product/${slug}`
                }
            })
        }


    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOkay = () => {
        setOpen(false);
        toast.success("Thanks for your review.");
    }

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpenModal} className={classes.button}>
                <StarOutlineIcon />
                {user ? 'Leave rating' : 'Login to leave rating'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">{"Leave your rating?"}</DialogTitle>
                <br />
                <DialogContent dividers>

                    {children}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleOkay} color="primary" autoFocus
                    >
                        Yes
          </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RatingModal