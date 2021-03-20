import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Collapse } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
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

}));

const AdminNav = ({ history }) => {

    const classes = useStyles();    
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = useState(false);

   const handleListItemClick = (event, index) => {
       setSelectedIndex(index);
   }

    const handleClick = () => {
       setOpen(!open);
    }

    return (
        <>
          <List
                component="nav"
                aria-labelledby="nested-list-subheader">
                    <ListItem button onClick={handleClick} disableRipple
                    className='mb-3'>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.listItemTexts} primary='Management' />
                        {/* <Typography >Settings</Typography> */}
                            {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                  <ListItem className={classes.listItems}
                                  button
                                  component={Link}
                                  to='/admin/dashboard'
                                  selected={selectedIndex === 0}
                                  onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                        <ListItemText><Typography className={classes.listItemTexts}>Admin Dashboard</Typography></ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/product'
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                    <ListItemIcon>
                       <CreateIcon />
                    </ListItemIcon>
                        <ListItemText><Typography className={classes.listItemTexts}>Create Product</Typography></ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/products'
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                    <ListItemIcon>
                    <CreateIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Update / Delete Products</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/category'
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                    <ListItemIcon>
                       <CreateNewFolderIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Create Category</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/sub'
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                    <ListItemIcon>
                    <CreateNewFolderIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Create Sub Category</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/coupon'
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5)}
                        >
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Coupons</Typography>
                            </ListItemText>
                        </ListItem>
                        
                        <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/user/password'
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}
                    >
                    <ListItemIcon>
                       <VpnKeyIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Update Password</Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem
                        button
                        className={classes.listItems}
                        component={Link}
                        to='/admin/choice'
                        selected={selectedIndex === 7}
                        onClick={(event) => handleListItemClick(event, 7)}
                    >
                    <ListItemIcon>
                    <CreateNewFolderIcon />
                    </ListItemIcon>
                        <ListItemText>
                            <Typography className={classes.listItemTexts}>Create Choice</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>

            </List>

        </>

    )



}

export default AdminNav
