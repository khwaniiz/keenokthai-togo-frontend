import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { auth } from "../../firebase";
import { toast } from "react-toastify";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Card, CardContent, CardHeader, Grid, Button } from "@material-ui/core";

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
    [theme.breakpoints.down('md')]: {
      padding: '0',
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
    margin: "1.5rem 0",
    '&:hover': {
      color: '#fca311',
       border: '1px #fca311 solid',
  }
  },

}));


const Signup = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (user && user.token) history.push('/')
  }, [user, history])

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),

  });

  
  const initialValues = {
    email: '',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_SIGNUP_REDIRECT_URL)
    const config = {
      url: process.env.REACT_APP_SIGNUP_REDIRECT_URL,
      handleCodeInApp: true
    }

    // await auth.sendSignInLinkToEmail(email, config)
    // toast.success(`An Email has been sent to ${email}.`)

    // // save user email in local storage
    // window.localStorage.setItem('emailForSignUp', email)

    // //Clear state
    // setEmail('');

      try {
    
      await auth.fetchSignInMethodsForEmail(email).then((signInMethods) => {
        if (signInMethods.length === 0) {
           auth.sendSignInLinkToEmail(email, config)
          toast.info(`An Email has been sent to ${email}.`)

          // save user email in local storage
          window.localStorage.setItem('emailForSignUp', email)
          //Clear state
          setEmail('');
      } else {
        toast.warning(`Email already in use`)
  }
})
  } catch (error) {
    console.log(error)
  }


  }


  const signupForm = () => (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
   >
    
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <FormikTextField
          name="email"
          label="Enter your email address"
          margin="normal"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          variant="outlined" 
          fullWidth
          required
        />
        <Button type='submit' variant="outlined" className={classes.btn}>Next</Button>
      </Form>
    
  </Formik>


  )

  return (
    <>
      <Box className={classes.hero}></Box>
      <Grid container direction='row' justify='center' className={classes.mainContainer}>
        <Grid item>
          <Card variant='outlined' justify='center' className={classes.cardContainer}>
            <CardHeader style={{ textAlign: 'center' }}
              title={
                <Typography variant="h4">
                  Sign Up
              </Typography>}

            />
            <CardContent>
              {signupForm()}
            </CardContent>
          </Card>

        </Grid>
      </Grid>

    </>
  );
};

export default Signup;
