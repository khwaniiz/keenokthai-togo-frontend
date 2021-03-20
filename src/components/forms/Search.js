import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginTop: '1em',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        color: 'hsl(212, 33%, 89%)',
        justifyContent: 'center',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'hsl(212, 33%, 89%)',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '10ch',
            '&:focus': {
                width: '20ch',
            },
        },
        color: 'hsl(212, 33%, 89%)',

    },
}));

const Search = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search;
    const history = useHistory()

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)   
    }


    return (
        <>
            {/* <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit} >

                <InputBase
                    onChange={handleChange}
                    type="search"
                    value={text}
                    placeholder="Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}

                />
                <SearchIcon onClick={handleSubmit} style={{ cursor: "pointer" }} className={classes.inputRoot} />

            </form> */}

            <form className={classes.search} onSubmit={handleSubmit}>
                <div className={classes.searchIcon}>
                    <SearchIcon onClick={handleSubmit} style={{ zIndex: 1302, cursor: 'pointer' }} />
                </div>
                <InputBase
                    onChange={handleChange}
                    type="search"
                    value={text}
                    placeholder="Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
            </form>


        </>
    )
}

export default Search