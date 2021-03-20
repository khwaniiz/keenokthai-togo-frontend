import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Badge, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),

    },
    input: {
        display: 'none',
      },

      btn: {
          color: '#fca311',
          margin: '1rem'
         
      }
}));

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const classes = useStyles();

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files)
        // resize
        let files = e.target.files;
        let allUploadedFiles = values.images
        if (files) {
            setLoading(true)
            for (const file of files) {
                Resizer.imageFileResizer(file, 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                        headers: {
                            authToken: user ? user.token : ''
                        }
                    })
                        .then(res => {
                            //console.log('IMAGE UPLOAD RES DATA', res)
                            setLoading(false)
                            allUploadedFiles.push(res.data)

                            setValues({ ...values, images: allUploadedFiles })
                        })
                        .catch(err => {
                            setLoading(false)
                            console.log('CLOUDINARY UPLOAD ERROR')
                        })
                }, 'base64')
            }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component-> ProductCreate
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        //console.log('remove image id', public_id)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authToken: user ? user.token : ''
            }
        })
            .then(res => {
                setLoading(false)
                const { images } = values
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id
                })

                setValues({ ...values, images: filteredImages })
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <>

            <div className="row">
                {values.images && values.images.map((image) => (
                    <div className={classes.root} key={image.public_id}>
                        <Badge color="secondary" badgeContent="x"
                            style={{ cursor: 'pointer', color: '#fff', marginLeft: '1rem' }}
                            onClick={() => { handleImageRemove(image.public_id) }}>

                            <Avatar src={image.url}

                                variant="square" className={classes.large} />



                        </Badge>
                    </div>
                ))}
            </div>

            <div className="row">
                {/* <label className='btn btn-primary btn-raised m-3'><Typography variant='subtitle2'>Choose File </Typography>
            <input type="file" multiple hidden accept='images/*' onChange={fileUploadAndResize} />
                </label> */}

                    <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={fileUploadAndResize}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="secondary" component="span" className={classes.btn}>
                    Upload Photos
                    </Button>
                </label>
              
                        
                        </div>

        </>
    )
}

export default FileUpload