import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import { auth } from "../../firebase";
import { toast} from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Hero from '../../components/Hero'

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '2rem',
        
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        
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
    label: {
        fontFamily: 'Nunito',
        fontWeight: '.1rem'
    },
    option: {
         fontFamily: 'Nunito',
         color: '#fca311',
    
    }

}));

const ForgotPassword = ({history}) => {

    const classes = useStyles();    
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state)=> ({...state}))

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Enter valid email").required("Required"),
    
      });
      
      const initialValues = {
        email: '',
      };

    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
          }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail('');
            setLoading(false);
            toast.info('Check your email for password reset link')
        }).catch((error)=> {
            setLoading(false);
            toast.warning(error.message)
            console.log(error)
        })

    }

    
    return (
        <>
        <Hero title={'Forgot Password'}/>
        <div className="container col-md-6 offset-md-3 p-5 mb-3">
            {loading ? <Spin indicator={antIcon} /> : <Typography variant='h6' mb={2}>Forgot Password</Typography>}

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
          onChange={(e)=>setEmail(e.target.value)}  
          variant="outlined" 
          fullWidth
          required
        />
        <Button type='submit' variant="outlined" onClick={handleSubmit} className={classes.btn} disabled={!email}>Submit</Button>
      </Form>
    
  </Formik>
        </div>
        </>
    )



}

export default ForgotPassword;