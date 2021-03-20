import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { createUpdateUser } from '../../functions/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Card, CardContent, CardHeader, Grid, CircularProgress } from "@material-ui/core";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';


const useStyles = makeStyles((theme) => ({
  textDanger: {
    color: '#ed1c0d',
    '&:hover': {
      color: 'rgb(170, 169, 169)'
    }
  },

  textSignup: {
    color: 'rgb(170, 169, 169)',
    marginLeft: '.5rem',
    '&:hover': {
      color: '#ed1c0d',
    }
  },

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

const Signin = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from)
    } else {
      if (user && user.token) history.push('/')
    }
  }, [user, history])

  let dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(6, "Password minimum length should be 6").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'At lest one uppercase letter, one lowercase letter, one number and one special character').required("Required"),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  // redirect
  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from)
    } else {

      if (res.data.role === 'admin') {
        history.push('/')
      } else {
        history.push('/');
      }

    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    //console.log(email, password)

    try {

      const result = await auth.signInWithEmailAndPassword(email, password);

      // console.log(result)

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // get user token
      createUpdateUser(idTokenResult.token, user.displayName).then(
        res => {
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
          roleBasedRedirect(res);
        })
        .catch(err => console.log(err))

    } catch (error) {
      console.log(error);
      toast.warning(error.message);
      setLoading(false)
    }

  }

  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      //console.log(user, idTokenResult)

      createUpdateUser(idTokenResult.token, user.displayName).then(
        res => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          })

          roleBasedRedirect(res);
        }).catch((err) => console.log(err))
      //history.push('/');
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
      setLoading(false)
    }
  }


  const loginForm = () => (
    // <form onSubmit={handleSubmit}>
    //   <div className="form-group bmd-form-group">
    //     <TextField type="email" label="Email address" value={email} id="formGroupEmail" onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth />
    //   </div>

    //   <div className="form-group bmd-form-group">
    //     <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} variant="outlined" fullWidth />
    //   </div>

    //   <Button
    //     onClick={handleSubmit}
    //     type="primary"
    //     className="mb-3"
    //     block
    //     shape="round"
    //     icon={<MailOutlined />}
    //     size="large"
    //     disabled={!email || password.length < 6}
    //   >
    //     Sign In
    //   </Button>

    //   <Button
    //     onClick={googleLogin}
    //     type="danger"
    //     className="mb-3"
    //     block
    //     shape="round"
    //     icon={<GoogleOutlined />}
    //     size="large"

    //   >
    //     Sign in with Google
    //   </Button>

    //   {/* <Link to='/forgot/password' className='float-left text-danger'>Forgot Password</Link> */}

    //   <Typography >
    //     <Link to='/forgot/password' className={classes.textDanger}>
    //       Forgot password ?
    //     </Link>
    //   </Typography>

    //   <Typography>Do you have an account?
    //     <Link to='/sign-up' className={classes.textSignup}>
    //       Sign Up
    //     </Link>
    //   </Typography>
    // </form>

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
   >
    
      <Form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group bmd-form-group">
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
      </div>
      <div className="form-group bmd-form-group">
          <FormikTextField
            name='password'
            type="password" 
            label="Enter password (minimum 6 characters)" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            variant="outlined" 
            fullWidth
            required
          /> 
        </div>

        <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Sign In
      </Button>

      <Button
        onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"

      >
        Sign in with Google
      </Button>

      {/* <Link to='/forgot/password' className='float-left text-danger'>Forgot Password</Link> */}

      <Typography >
        <Link to='/forgot/password' className={classes.textDanger}>
          Forgot password ?
        </Link>
      </Typography>

      <Typography>Do you have an account?
        <Link to='/sign-up' className={classes.textSignup}>
          Sign Up
        </Link>
      </Typography>
      </Form>
    
  </Formik>



  )

  return (

    <>
      {/*==== Hero Section ===*/}
      <Box className={classes.hero}></Box>

      <Grid container direction='row' justify='center' className={classes.mainContainer}>
        <Grid item>
          <Card variant='outlined' justify='center' className={classes.cardContainer}>
            <CardHeader style={{ textAlign: 'center' }}
              title={
                <Typography variant="h4" className={classes.cardHeader}>
                  Sign In
              </Typography>}

            />
            <CardContent>

              {loading ? <CircularProgress /> : null}
              {loginForm()}

            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
