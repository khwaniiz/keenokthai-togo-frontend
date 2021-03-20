import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from 'moment'
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import {  TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import{ init } from 'emailjs-com';
init(process.env.REACT_APP_EMAILJS_USERID);

const useStyles = makeStyles((theme) => ({
  inputContainer: {
     
  },
  input: {
      fontFamily: 'Nunito',
      color: '#fca311',  
      marginBottom: '.75rem'
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
    margin: "1.5rem 1rem 1.5rem 0",
    '&:hover': {
      color: '#fca311',
       border: '1px #fca311 solid',
  }
  },
 
}));

const UpdateStatusForm = ({allusers, order}) => {
  const [subject, setSubject] = useState('Order Confirmation');
  const [id, setId] = useState(`Order ID: ${order._id}`)
  const [pickup, setPickup] = useState(`Pickup Date: ${new Date(order.pickupDateTime).toLocaleString()}`)
  const [payment, setPayment] = useState(`Payment Method: ${order.paymentIntent.status === 'succeeded' ? 'Card' : '' || order.paymentIntent.status === 'Cash Payment' ? 'Cash' : 'Venmo'}`)
  const [total, setTotal] = useState(`Total: $${(order.paymentIntent.amount/100).toFixed(2)}`)
  const [products, setProducts] = useState(`${order.products.map((p) => ('\n' + p.product.title + '\r' + p.typeOfChoice + '\r' + p.instructions + '\r' + p.count))}`)
  const [updateStatus, setUpdateStatus] = useState(`${order.paymentIntent.status === 'succeeded' ? 'Your order has been confirmed, details below.' : '' || order.paymentIntent.status === 'Cash Payment' ? 'Your order has been confirmed, details below.\rIf paying by cash make sure to bring payment with you on your pickup date.' : 'Your order has been confirmed, details below.\rPlease submit your Venmo payment to "keenokthai-togo" prior to your pickup time.'}`);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);


  const classes = useStyles();    

  const senderEmail = 'keenokthai@gmail.com';
  const receiverEmail = allusers.filter((u) => u._id === order.orderedBy).map(u => u.email).toString()
  const receiverName = allusers.filter((u) => u._id === order.orderedBy).map(u => u.name).toString()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let item = [
    { google: 'Google' }
 ];


    const handleCancel = () => {
        setUpdateStatus('');
    };

    const handleChange = (event) => {
      setUpdateStatus(event.target.value);
       
    };

    const handleSubject = (event) => {
      setSubject(event.target.value);
     
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      const user = process.env.REACT_APP_EMAILJS_USERID
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATEID
 
      sendUpdateStatus({
        templateId,
        senderEmail,
        receiverEmail,
        receiverName,
        updateStatus,
        id,
        pickup,
        total,
        subject,
        user,
        payment
      })
        setFormSubmitted(true);
    }

const sendUpdateStatus = ({
    senderEmail,
    receiverEmail,
    receiverName,
    updateStatus,
    id,
    pickup,
    total,
    user,
    subject,
    templateId,
    payment
}) => {
    window.emailjs.send(
         'default_service',
        templateId,
                {
          senderEmail,
          receiverEmail,
          updateStatus,
          receiverName,
          id,
          pickup,
          total,
          subject,
          payment
        },
        user
      
    ).then((res) => {
      if(res.status === 200) {
        setFormSubmitSuccessful(true);
        setUpdateStatus('');
        toast.info('Email has been sent to the customer!')
      }
    })
    .catch((err) => {
      console.error('Failed to send status updated. Error: ', err)
      toast.warning(err)
    })

      if (formSubmitted && formSubmitSuccessful) {
    return <h2>Thank You! Your submission was sent.</h2>;
  }
  setUpdateStatus('');
}

    return (
      <>

      <div style={{margin: '1.5rem 0 3rem 0', color: '#fca311' }}>
        <AddToCalendar event={{
              title: `Customer's name: ${receiverName}`,
              description: `Customer's email: ${receiverEmail}\n${id}\n${payment}\n\nItems:${products}\n\n${total}`,
              location: "Chicago, IL",
              startTime: `${moment(pickup).format()}`,
              endTime: `${moment(pickup).format()}`,
   
          }} 
          listItems={item}
          buttonTemplate={{'calendar-plus-o': 'left'}}
          displayItemIcons={false}
        
          />
      </div>
      
        <form onSubmit={handleSubmit} className={classes.inputContainer}>
        <Typography variant='h6'>Update customer</Typography>
        <div>
          <TextField
            type="text"
            value={senderEmail}
            autoFocus
            fullWidth
            required
            label='Keenok admin'
            InputProps={{
              className: classes.input,
            }}
            
          />
        </div>
        <div>
          <TextField
            type="text"
            autoFocus
            fullWidth
            required
            label='Subject'
            multiline 
            onChange={handleSubject}
            defaultValue={subject}
            InputProps={{
              className: classes.input,
            }}
              
            />
        </div>
        <div>
          <TextField
            type="text"
            onChange={handleChange}
            autoFocus
            fullWidth
            required
            label='Update status'
            multiline 
            defaultValue={updateStatus}
            InputProps={{
              className: classes.input,
            }}
              
            />
        </div>

        <div>
          <TextField
            type="text"
            autoFocus
            fullWidth
            required
            label='Order ID'
            multiline 
            defaultValue={id}
            InputProps={{
              className: classes.input,
            }}
              
            />
        </div>

        <div>
          <TextField
            type="text"
            autoFocus
            fullWidth
            required
            label='Payment Method'
            multiline 
            defaultValue={payment}
            InputProps={{
              className: classes.input,
            }}
              
            />
        </div>

        <div>
          <TextField
            type="text"
            autoFocus
            fullWidth
            required
            label='Total'
            multiline 
            defaultValue={total}
            InputProps={{
              className: classes.input,
            }}
              
            />
        </div>


        <div>
        <TextField
            type="text"
            value={receiverEmail}
            autoFocus
            required
            fullWidth
            label='Customer email'
            InputProps={{
              className: classes.input,
            }} 
          />
        </div>

          <div className='btn-group'>
                      <Button className={classes.btn} onClick={handleCancel}>
                      Cancel
                      </Button>
                      <input type='submit' value='Submit' className={classes.btn} style={{cursor: 'pointer'}}/>
                  </div>
      </form>

        </>
    )
}

export default UpdateStatusForm;