import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createUpdateUser } from '../../functions/auth';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Card, CardContent, CardHeader, Grid, TextField, Button } from "@material-ui/core";

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
      padding: '0',
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
      backgroundColor: '#fff',
      color: '#000',
    }

  },
  cardHeader: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    }
  }

}));


const SignupComplete = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  //const {user} = useSelector((state)=>({...state}))

  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignUp'))
    // console.log(window.location.href)
  }, [history])

  let dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(6, "Password minimum length should be 6").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password does not match criteria').required("Required"),

    confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], "Password not matched").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'At lest one uppercase letter, one lowercase letter, one number and one special character').required("Required"),

  });
  
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!email || !password) {
      toast.warning('Email and password is required');
      return
    }

    if (password.length < 6) {
      toast.warning('Password must be at least 6 characters long')
      return
    }

    if( password !== confirmPassword) {
      toast.warning('Password do not match, please try again')
      return
    }

    try {

      const result = await auth.signInWithEmailLink(email, window.location.href)

      //console.log('Result', result)

      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForSignUp')

        // get user id token func from firebase
        let user = auth.currentUser;
        await user.updatePassword(password);
        await user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            // Update successful.
            console.log('name', user.displayName)
          })
     
        const idTokenResult = await user.getIdTokenResult();
    
        // redux store
       // console.log('user', user, 'idTokenResult', idTokenResult, 'userName', userName)

        createUpdateUser(idTokenResult.token, user.displayName).then(
          res => {
            console.log('res', res)
           
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
              }
            })
          }
        ).catch()
        // redirect
        history.push('/signup-success');
      }

    } catch (error) {
      console.log(error);
      toast.warning(error.message)
    }


  }


  const completeSignupForm = () => (

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
   >
    
      <Form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group bmd-form-group">
        <TextField
          name="email"
          type="email" 
          disabled 
          margin="normal"
          value={email} 
          variant="outlined" 
          fullWidth
          
         />
      </div>

      <div className="form-group bmd-form-group">
          <FormikTextField
            name='name'
            type="text" 
            label="Enter your name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            variant="outlined" 
            fullWidth
            required
          /> 
        </div>

      <div className="form-group bmd-form-group">
          <FormikTextField
            name='password'
            type="password" 
            label="Enter your password (minimum 6 characters)" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            variant="outlined" 
            fullWidth
            required
          />  <span>At lest one uppercase letter, one lowercase letter, one number and one special character</span>
        </div>

        <div className="form-group bmd-form-group">
          <FormikTextField
            name='confirmPassword'
            type="password" 
            label="Confirm your password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            variant="outlined" 
            fullWidth
        />  
        </div>
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
                <Typography variant="h4" className={classes.cardHeader}>
                  Complete Sign Up
              </Typography>}

            />
            <CardContent>
              {completeSignupForm()}
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default SignupComplete;
