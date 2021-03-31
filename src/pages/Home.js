import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid, Button, Card, CardContent, Tooltip, ButtonBase, ClickAwayListener } from '@material-ui/core';

import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
// import CategoryList from '../components/category/CategoryList'
//import SubList from '../components/sub/SubList'
//import { getCategories } from '../functions/category'
// import CategoryHome from '../pages/category/CategoryHome'

import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalMallIcon from '@material-ui/icons/LocalMall';


const images = [
  {
    url: 'https://images.unsplash.com/photo-1605546243488-11c06234f21a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    title: 'Baked Goods',
    width: '30%',
    link: '/category/baked-goods'
  },
  {
    url: 'https://res.cloudinary.com/dnk89i35i/image/upload/v1611951679/THAI_FOOD_thailand_asian_4256x2832_b5idzd.jpg',
    title: 'Thai Foods',
    width: '40%',
    link: '/category/thai-dishes'
  },
  {
    url: 'https://res.cloudinary.com/dnk89i35i/image/upload/v1611951678/mango-sticky-rice-3604851_1920_hg4muo.jpg',
    title: 'Desserts',
    width: '30%',
    link: '/category/desserts'
  },
];


const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80')`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  headerText: {
    color: '#fff',
    margin: "1.5rem 0"
  },

  headerFirst: {
    color: '#fff',
    margin: "1.5rem 0",
    letterSpacing: '3px',
    fontSize: '4rem',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {

      fontSize: '3.75rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.5rem'
    }
  },

  headerTogo: {
    fontFamily: 'Nunito',
    letterSpacing: '3px',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#fff',
    margin: "1.5rem 0",
      [theme.breakpoints.down('md')]: {

      fontSize: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem'
    }
  },

  headerSecond: {
    color: '#fff',
    margin: "1.5rem 0",
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem'
    }
  },
  btn: {
    ...theme.button,
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    padding: '10px 30px',
    border: '1px #fff solid',
    margin: "1.5rem 0",
  },
  mainContainer: {
    marginTop: '2.5rem'
  },
  cardContainer: {
    width: '180px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: '2rem',
    marginLeft: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    '&:hover': {
      boxShadow: theme.shadows[5],
      cursor: 'pointer'
    }

  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '.5rem',
  },
  customTooltip: {
    fontFamily: 'Nunito',
    fontSize: '1rem',
    marginTop: '-2rem'
  },
  title: {

    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  image: {
    position: 'relative',
    height: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        //border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  link: {
    color: 'hsl(212, 33%, 89%)',
    '&:hover': {
        color: 'rgb(170, 169, 169)'
    }
  }
}));


const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
 
 useEffect(() => {
  window.scrollTo(0, 0)
}, [])
  

  const handleTooltipClose = () => {
      setOpen(false);
  };

  const handleTooltipOpen = () => {
     setOpen(true);
  };

  const handleTooltipClose2 = () => {
   setOpen2(false);
};

const handleTooltipOpen2 = () => {
    setOpen2(true);
};

const handleTooltipClose3 = () => {
  setOpen3(false);
};

const handleTooltipOpen3 = () => {
   setOpen3(true);
};


  return (
    <>
      {/*==== Hero Section ===*/}
      <Box className={classes.hero}>
        <Box m={2} textAlign="center">
          {/* <Jumbotron text={['Keenok Thai', 'To-Go']} className={classes.headerText} /> */}
          <Typography variant='h5' className={classes.headerFirst}>Keenok Thai</Typography>
          <Typography className={classes.headerTogo}>To Go</Typography>
          <Typography variant='subtitle1' className={classes.headerText}>อาหารไทยแบบไทยๆ</Typography>
          <Button variant="outlined" className={classNames(classes.btn, classes.link)}  component={'a'}
          href="https://keenokthai.netlify.app/index.html"
          target='_blank'
          rel="noopener noreferrer">Pop Up</Button>
        </Box>
      </Box>

      {/*==== How To Order Section ===*/}

      <Box mt={15} mb={15} textAlign="center" >
        <Typography variant='h4' className={classes.title}>How To Order</Typography>
        <Typography variant='subtitle1' >Follow the Steps</Typography>
        <Grid container direction='row' justify='center' className={classes.mainContainer}>

          <Grid item >
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip 
             PopperProps={{
              disablePortal: true,
              }}
              disableFocusListener
              disableHoverListener
              onClose={handleTooltipClose}
              open={open}
            title="Pick what you'd like to eat" 
            classes={{
              tooltip: classes.customTooltip,

            }}>
              <Card variant="outlined" className={classes.cardContainer} onClick={handleTooltipOpen}>
                <CardContent>
                  <MenuBookIcon className={classes.cardIcon} color='secondary' />
                  <Typography variant="h6" >Choose</Typography>
                </CardContent>
              </Card>
            </Tooltip>
            </ClickAwayListener>
          </Grid>

          <Grid item>
          <ClickAwayListener onClickAway={handleTooltipClose2}>
            <Tooltip   
            PopperProps={{
              disablePortal: true,
              }}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Cash, Card, Venmo"
              onClose={handleTooltipClose2}
              open={open2}
              classes={{
                tooltip: classes.customTooltip,

              }}>
              <Card variant="outlined" className={classes.cardContainer} onClick={handleTooltipOpen2}>
                <CardContent>
                  <CreditCardIcon className={classes.cardIcon} color='secondary' />
                  <Typography variant="h6">Pay</Typography>
                </CardContent>
              </Card>
            </Tooltip>
            </ClickAwayListener>
          </Grid>

          <Grid item>
          <ClickAwayListener onClickAway={handleTooltipClose3}>
          <Tooltip   
            PopperProps={{
              disablePortal: true,
              }}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Select your pick up time and date, minimum 1 week advance"
              onClose={handleTooltipClose3}
              open={open3}
              classes={{
                tooltip: classes.customTooltip,

              }}>
              <Card variant="outlined" className={classes.cardContainer} onClick={handleTooltipOpen3}>
                <CardContent>
                  <LocalMallIcon className={classes.cardIcon} color='secondary' />
                  <Typography variant="h6" >Pick up</Typography>
                </CardContent>
              </Card>
            </Tooltip>
            </ClickAwayListener>
          </Grid>
        </Grid>
      </Box>

         {/*==== Categories Section ===*/}
      <Box mt={15} mb={8} textAlign="center">

        {images.map((image) => (
          <ButtonBase
            component={Link}
            to={image.link}
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </Box>

      {/*==== Favorite Dishes Section ===*/}

      <Box mt={10} mb={8} textAlign="center">
        <Typography variant='h4' className={classes.title}>Best Sellers</Typography>
        <Typography variant='subtitle1' >Our Favorites</Typography>
      </Box>
      <Box><BestSellers /></Box>

 
  {/*==== New Dishes Section ===*/}

  <Box mt={10} mb={8} textAlign="center" >
        <Typography variant='h4' className={classes.title}>New Dishes</Typography>
        <Typography variant='subtitle1' >This Just In!</Typography>
      </Box>
      <Box> <NewArrivals /></Box>



    </>
  );

};

export default Home;
