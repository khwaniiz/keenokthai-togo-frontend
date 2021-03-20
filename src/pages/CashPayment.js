import React, {useEffect} from "react";
import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Card, CardContent, CardHeader, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1611957189/andrew-ly-4fkJZ4Txrbw-unsplash_1_il9dsr.jpg')`,
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

  mainContainer: {
    fontFamily: 'Nunito'
  },

  cardContainer: {
    marginTop: '-12rem',
    zIndex: 1,
    boxShadow: theme.shadows[3],
    padding: '1rem',
    margin: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '-8.5rem',
      
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '-9.5rem',
    }
  },
  btn: {
    fontFamily: 'Nunito',
    textTransform: 'none',
    borderRadius: '200px',
    border: '1px rgba(9, 9, 9, 0.8) solid',
    transition: 'all .2s ease',
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: 'rgba(9, 9, 9, 0.8)',
    padding: '5px 15px',
    margin: "1.5rem",
    '&:hover': {
        color: '#fca311',
         border: '1px #fca311 solid',
    },
    [theme.breakpoints.down('md')]: {
        margin: ".5rem",
      },
    
  },
  cardHeader: {
    fontFamily: 'Imprima',
    letterSpacing: '1px',
    fontSize: '2.5rem',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    }
  },
  buttonContainer: {
      display: 'flex',
      justifyItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'row',
      marginTop: '2rem',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        
      }
  },
  


}));


const CashPayment = ({ history }) => {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  return (
    <>
      <Box className={classes.hero}></Box>
      <Grid container direction='row' justify='center' className={classes.mainContainer}>
        <Grid item>
          <Card variant='outlined' justify='center' className={classes.cardContainer}>
            <CardHeader style={{ textAlign: 'center' }}
              title={
                <Typography className={classes.cardHeader}>
                    Your order has been received! 
              </Typography>}

            />
            <CardContent>
                <Typography variant='subtitle2' style={{marginBottom: '1rem'}}>You will received an order acknowledgement email shortly. Thank you so much and have a nice day! :) 
                  </Typography>
                  <Typography variant='subtitle2'>  If you have any questions, feel free to contact us at keenokthai@gmail.com or 912-658-6723.</Typography>
   
                            <div className={classes.buttonContainer}>
                              <Button
                                className={classes.btn}
                                component={Link}
                                to='/user/history'
                                >
                                Order History
                              </Button>
                            </div>

                      
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default CashPayment;
