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

const CategoryForm = ({ handleSubmit, name, setName }) => {
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
                   label='Category Name'
                    InputProps={{
                        className: classes.input,
                    }}
                    
                    fullWidth
                />
             </div>
             
            <br />
            <Button variant='outlined' color='secondary' onClick={handleSubmit} className={classes.btn}>Save</Button>
      

    </form>
        </>
    )
}

export default CategoryForm
