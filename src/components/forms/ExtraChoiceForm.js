import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Box, Button } from '@material-ui/core';

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

const ExtraChoiceForm = ({ handleSubmit, name, setName, price, setPrice }) => {
    const classes = useStyles();    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
                <TextField
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                    autoFocus
                    required
                    label='Choice'
                        InputProps={{
                            className: classes.input,
                        }}
                        
                        fullWidth
                    />
            </div>

            <div className={classes.inputContainer}>
            <TextField
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price || ''}
                     label='Price'
                    fullWidth
                     InputProps={{
                         className: classes.input,
                     }}
                 />
            </div>
             
            <br />
            <Button variant='outlined' color='secondary' onClick={handleSubmit} className={classes.btn}>Save</Button>
      

    </form>
        </>
    )
}

export default ExtraChoiceForm
