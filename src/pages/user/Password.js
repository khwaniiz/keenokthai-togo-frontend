import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import { Spin } from "antd";
import {LoadingOutlined } from "@ant-design/icons";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dnk89i35i/image/upload/v1612220926/jonny-clow-xZa4JUE7EdM-unsplash_dydmwi.jpg')`,
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

    wishlistContainer: {
        backgroundColor: '#f4f4f4f4;',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '10px',
    },
    link: {
      fontFamily: 'Nunito',
      fontSize: '1rem',
      color: '#000',
      '&:hover': {
        color: '#fca311' 
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

const Password = () => {
    const classes = useStyles();

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    let { user } = useSelector((state) => ({ ...state }))

    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().min(6, "Password minimum length should be 6").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password does not match criteria').required("Required"),
        password: Yup.string().min(6, "Password minimum length should be 6").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password does not match criteria').required("Required"),
        checkPassword: Yup.string().oneOf([Yup.ref('password'),null], "Password not matched").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'At lest one uppercase letter, one lowercase letter, one number and one special character').required("Required"),
    
      });
      
      const initialValues = {
        currentPassword: '',
        password: '',
        checkPassword: ''
      };
  
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        //console.log(user.email, currentPassword)
        await auth.signInWithEmailAndPassword(user.email, currentPassword).then(() => {
            if(password !== checkPassword) {
                toast.warning('Password do not match, please try again')
                setLoading(false)
            } else {
                 auth.currentUser.updatePassword(password).then(() => {
                    setLoading(false)
                    setPassword('')
                    setCurrentPassword('')
                    setCheckPassword('')
                    
                    toast.info('Password updated')
                }).catch(err => {
                    setLoading(false)
                    toast.warning(err.message)
                })
            }
            
        })
        .catch(err => {
            setLoading(false)
            toast.warning(err.message)
        })

       
        
    }

    const passwordUpdateForm = () => (

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
   >
    
      <Form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group bmd-form-group">
          <FormikTextField
            name='currentPassword'
            type="password" 
            label="Enter your current password" 
            value= {currentPassword}
            onChange={e=> setCurrentPassword(e.target.value)} 
            disabled={loading} 
            variant="outlined" 
            fullWidth
          /> 
        </div>

      <div className="form-group bmd-form-group">
          <FormikTextField
            name='password'
            type="password" 
            label="Enter your new password (minimum 6 characters)" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            disabled={loading}
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
            value={checkPassword} 
            onChange={e => setCheckPassword(e.target.value)} 
            variant="outlined" 
            fullWidth
            disabled={loading}
        />  
        </div>
        <Button
        onClick={handleSubmit}
        disabled={!currentPassword || loading}
        className={classes.btn}
      >
        Submit
      </Button>
      </Form>
    
  </Formik>
        )

    return (

        <>
            {/*==== Hero Section ===*/}
          <Box className={classes.hero}>
                <Typography variant='h1' className={classes.headerFirst}>My Wishlist</Typography>
            </Box>
        <div className="container-fluid">
        <div className="row mt-5 mb-5">
            <div className="col-md-3">
                <UserNav />
            </div>
            <div className="col-md-9">

    {loading ? (<Spin indicator={antIcon} />) :     <Typography variant='h6' className='mb-3'>Password Update</Typography>
          }
              {passwordUpdateForm()}
            </div>
        </div>
    </div>
    </>
    )
 
}

export default Password
