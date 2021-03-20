import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Collapse } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subHeader: {
        fontSize: '30px'
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1611980714/payoon-gerinto-jF9AJ6eQJlk-unsplash_posx7m.jpg')`,
        height: '50vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        zIndex: -1
    },
    headerFirst: {
        color: '#fff',
        margin: "1.5rem 0",
        [theme.breakpoints.down('md')]: {

            fontSize: '3.75rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5rem'
        }
    },

    paperList: {
        backgroundColor: '#f4f4f4f4;',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '10px',
    },

    listItems: {
      
        '&:hover': {
            color: '#fca311'      
        },
        '&.Mui-selected': { 
            color: '#fca311',
          
        }
    },

    listItemTexts: {
        fontSize: '1rem',
         fontFamily: 'Nunito',
        '&:hover': {
            color: '#fca311'
        }
    },

    nav: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Nunito',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    }
}));

const UserNav = () =>   {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
     const [open, setOpen] = useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

     const handleClick = () => {
        setOpen(!open);
    };

        return (
            <>
             <List
                component="nav"
                aria-labelledby="nested-list-subheader">
                    <ListItem button onClick={handleClick} disableRipple>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.listItemTexts} primary='Settings' />
                        {/* <Typography >Settings</Typography> */}
                            {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                  <ListItem className={classes.listItems}
                                  button
                                  component={Link}
                                  to='/user/history'
                                  selected={selectedIndex === 0}
                                  onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText><Typography className={classes.listItemTexts}>History</Typography></ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/user/password'
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                    <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText><Typography className={classes.listItemTexts}>Password</Typography></ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/user/wishlist'
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                    <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Wishlist</Typography>
                            </ListItemText>
                        </ListItem>

                         <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/user/account-issue'
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                    <ListItemIcon><BugReportIcon /></ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Account Issue</Typography>
                            </ListItemText>
                        </ListItem>
                       
                    </List>
                </Collapse>

            </List>
    </>
        )
}
 
export default UserNav
