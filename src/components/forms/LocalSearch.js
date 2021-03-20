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
        margin: '1.5rem 0'
    }

}));

const LocalSearch = ({ keyword, setKeyword }) => {
    const classes = useStyles();  
    // Search Filter 3
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }
    return (

        <Box className={classes.inputContainer}>
            {/* Search Filter 2 */}
            <TextField 
                type="search"
                placeholder='Filter'
                value={keyword}
                onChange={handleSearchChange}
                label='Search category'
                fullWidth
                InputProps={{
                    className: classes.input,
                }}
                />
        </Box >
    )
}

export default LocalSearch
