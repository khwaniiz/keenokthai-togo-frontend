import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
// import firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search'
import bird from '../../assests/bird.svg'
import classNames from 'classnames';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { AppBar, Toolbar, Typography, Badge, IconButton, MenuItem, Menu, Button, Box, SwipeableDrawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import transitions from "@material-ui/core/styles/transitions";

const useStyles = makeStyles((theme) => ({
  btn: {
    ...theme.button,
    marginRight: theme.spacing(2),
  },

  linkColor: {
    color: 'hsl(212, 33%, 89%)',
    '&:hover': {
      color: 'rgb(170, 169, 169)'
    }
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '.5em',
  },
  logo: {
    height: '2.5em'
  },
  logoContainer: {
    padding: '10px',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    marginRight: 'auto'
  },
  tabContainer: {
    marginLeft: 'auto'
  },

  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  appBarTransparent: {
    backgroundColor: 'transparent',
    marginBottom: '3em',

  },
  appBarSolid: {
    backgroundColor: 'rgba(9, 9, 9, 0.8)',
    boxShadow: '0 5px 5px -5px #333',
  },
  appBarFontColorSolid: {
    color: 'hsl(212, 33%, 89%)',
    fontFamily: 'Nunito',
    textTransform: 'none',
    marginLeft: '4px',
    marginRight: '4px',
    "&:hover": {
      color: 'rgb(170, 169, 169)',
      backgroundColor: 'transparent'
    },
  },
  menu: {
    backgroundColor: 'rgba(9, 9, 9, 0.8)',
    boxShadow: '0 5px 5px -5px #333',
    color: 'hsl(212, 33%, 89%)',
    fontFamily: 'Nunito'
  },
  menuItem: {
    color: 'hsl(212, 33%, 89%)',
    '&:hover': {
      opacity: 1
    }
  },
  drawerIconContainer: {
    color: 'hsl(212, 33%, 89%)',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  drawerIconContainerCart: {
    color: 'hsl(212, 33%, 89%)',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
  ,
  drawerIcon: {
    height: '25px',
    width: '25px'
  },
  drawer: {
    backgroundColor: 'rgba(9, 9, 9, 0.8)',
  },

  drawerItem: {
    fontSize: '1rem',
    color: '#fff',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    }

  },

  list: {
    width: '250px',
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,

  },


}));


const Navbar = () => {
  const [current, setCurrent] = useState("home");
  let history = useHistory();
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }))

  const classes = useStyles();
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [openDrawer, setOpenDrawer] = useState(false)
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const [navBackground, setNavBackground] = useState('appBarTransparent')

  const navRef = React.useRef()
  navRef.current = navBackground


  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10
      if (show) {
        setNavBackground('appBarSolid')

      } else {
        setNavBackground('appBarTransparent')

      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])



  const signout = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null
    });

    history.push('/sign-in')
  }

  const handleClick = (e) => {
    setCurrent(e.key)
    setOpen(true)
    setOpenMenu(true)
  };


  const handleChange = (event) => {
    setAuth(event.target.checked);
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
    setOpenMenu(true)

  };

  const handleClose = () => {
    setAnchorEl(false)
    setOpen(false)
    setOpenMenu(false)
  };

  const desktopMenu = (
    <>
  
      <Search />
      <Button
        className={classes.appBarFontColorSolid}
        component={Link}
        to="/menu"
      >
        <Typography className={classes.appBarFontColorSolid}>
          Menu
                </Typography>
      </Button>

      <Button
        component={'a'}
        className={classes.appBarFontColorSolid}
        href="https://keenokthai.netlify.app/about.html"
        target='_blank'
        rel="noopener noreferrer"
      >
        <Typography className={classes.appBarFontColorSolid}>
          About
                </Typography>
      </Button>


      {cart ? (
        <Badge badgeContent={cart.length}
          color='secondary'
          overlap="circle"
        >
          <IconButton
            className={classes.appBarFontColorSolid}
            component={Link}
            to='/cart'
          >
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
      ) : (

          <IconButton
            color="secondary"
            className={classes.appBarFontColorSolid}
            component={Link}
            to='/cart'
          >
            <ShoppingCartIcon />
          </IconButton>

        )}

      {user && (
        <div>

          <Button
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup={anchorEl ? 'true' : undefined}
            onClick={handleMenu}
            className={classes.appBarFontColorSolid}
            startIcon={<AccountCircle />}

          >
            {user.email && user.name}


          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}

            classes={{ paper: classes.menu }}
          >

            {user &&
              (<MenuItem open={false} onClick={handleClose}
                classes={{ root: classes.menuItem }}
              >

                {user && user.role === 'subscriber' && (
                  <Link to='/user/history' className={classes.appBarFontColorSolid}>My Account</Link>
                )}
                {user && user.role === 'admin' && (
                  <Link to='/admin/dashboard' className={classes.linkColor}>Dashboard</Link>
                )}


              </MenuItem>)}

            <MenuItem
              classes={{ root: classes.menuItem }}
              open={false}
            >
              <Link to='' onClick={signout} className={classes.linkColor}>Logout</Link></MenuItem>

          </Menu>
        </div>
      )}

      {!user && (<div style={{ marginRight: '10px', marginLeft: '10px' }}><Button variant="outlined" className={classes.btn}><Link to='/sign-in' className={classes.appBarFontColorSolid}> Sign In </Link></Button></div>)}
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List className={classes.list}>

          <ListItem onClick={() => setOpenDrawer(false)} divider button
            component={Link}
            to='/'
          >
            <ListItemIcon className={classes.drawerItem}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.drawerItem} disableTypography>Home</ListItemText>
          </ListItem>

          <ListItem onClick={() => setOpenDrawer(false)} divider button
            component={Link}
            to='/menu'
          >
            <ListItemIcon className={classes.drawerItem}>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.drawerItem} disableTypography>Menu</ListItemText>
          </ListItem>

          <ListItem onClick={() => setOpenDrawer(false)} divider button
          >
            <ListItemIcon className={classes.drawerItem}>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.drawerItem} disableTypography><a href='https://www.keenokthai.com/about.html' target='_blank' rel="noopener noreferrer" className={classes.linkColor}>About</a></ListItemText>
          </ListItem>

          {user && user.role === 'subscriber' && (
            <>
              <ListItem onClick={() => setOpenDrawer(false)} divider button
                component={Link}
                to='/user/history'
              >
                <ListItemIcon className={classes.drawerItem}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  className={classes.drawerItem} disableTypography>My Account</ListItemText>
              </ListItem>

              <ListItem onClick={() => {setOpenDrawer(false); signout()}} divider button
                component={Link}
                // onClick={signout}
                to=''
              >
                <ListItemIcon className={classes.drawerItem}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.drawerItem} disableTypography>Sign out</ListItemText>
              </ListItem>

            </>
          )}
          {user && user.role === 'admin' && (
            <>
              <ListItem onClick={() => setOpenDrawer(false)} divider button
                component={Link}
                to='/admin/dashboard'
              >
                <ListItemIcon className={classes.drawerItem}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  className={classes.drawerItem} disableTypography>Dashboard</ListItemText>
              </ListItem>

              <ListItem onClick={() =>{ setOpenDrawer(false); signout();}} divider button
                component={Link}
                // onClick={signout}
                to=''
              >
                <ListItemIcon className={classes.drawerItem}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.drawerItem} disableTypography>Sign out</ListItemText>
              </ListItem>

            </>
          )}

          {!user && (<ListItem onClick={() => setOpenDrawer(false)} divider button
            component={Link}
            to='/sign-in'
          >
            <ListItemIcon className={classes.drawerItem}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              className={classes.drawerItem} disableTypography>Sign in</ListItemText>
          </ListItem>)}

          <Box>
            <Search />
          </Box>


        </List>
      </SwipeableDrawer>

      <Box
        className={classes.drawerIconContainerCart}
      >
        {cart ? (
          <Badge badgeContent={cart.length}
            color="secondary"
            overlap="circle">
            <IconButton
              className={classes.appBarFontColorSolid}
              component={Link}
              to='/cart'
            >
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        ) : (

            <IconButton
              color="default"

              className={classes.appBarFontColorSolid}
              component={Link}
              to='/cart'
            >
              <ShoppingCartIcon />
            </IconButton>

          )}
      </Box>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )


  return (
    <>
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        fontFamily: 'Nunito'

      }}>
        <AppBar className={classNames(classes[navRef.current], classes.appBar)} elevation={navRef.current = 'transparent' ? 0 : 1}>
          <Toolbar disableGutters>

            <Button disableRipple component={Link} to='/' className={classes.logoContainer}
            >
              <img alt='company logo' className={classes.logo} src={bird} />
              <Typography variant="h6" className={classes.appBarFontColorSolid}>
                Keenok
                </Typography>
            </Button>


            {matches ? drawer : desktopMenu}

          </Toolbar>

        </AppBar>

        {/* <div className={classes.toolbarMargin} /> */}

      </div>
    </>
  );


};

export default Navbar;
