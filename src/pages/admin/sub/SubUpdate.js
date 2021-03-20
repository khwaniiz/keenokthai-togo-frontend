import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from '../../../components/nav/AdminNav'
import Hero from '../../../components/Hero'
import { getCategories } from "../../../functions/category";
import { getSub, updateSub, } from "../../../functions/sub";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Box, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '2rem',
        
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        
    }, 
    btn: {
        color: '#fca311',
    

    },
    label: {
        fontFamily: 'Nunito',
        fontWeight: '.1rem'
    },
    option: {
         fontFamily: 'Nunito',
         color: '#fca311',
    
    },
    resultContainer: {
        backgroundColor: '#f4f4f4f4;',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: '10px',
    }
}));

const SubUpdate = ({ match, history }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');
    const classes = useStyles();  


    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    // console.log(categories)

    const loadSub = () => getSub(match.params.slug).then((s) => {
        setName(s.data.name)
        setParent(s.data.parent)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.info(`"${res.data.name}" is updated`)
                history.push('/admin/sub');
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.warning(err.response.data)
            })
    }


    return (
        <>
           <Hero title={'Create Category'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>
                         <div className="col-md-9">
                        {loading ? (
                            <Spin indicator={antIcon} />
                        ) : (<Typography variant='h6'  className="mb-3">Update sub category</Typography>)}

                <Box className={classes.inputContainer}>
                    <label className={classes.label}>Main category</label>
                        <select
                        name="category"
                        className="form-control"
                        onChange={(e) => setParent(e.target.value)}
                        style={{fontFamily: 'Nunito',
              color: '#fca311',}}
                        >
                <option className={classes.option}>Please select</option>
                {categories.length > 0 &&
                    categories.map((c) => (
                    <option key={c._id} value={c._id === parent} >
                        {c.name}
                    </option>
                    ))}
                </select>
            </Box>

                        {/* {JSON.stringify(category)} */}
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />


                    </div>
                </div>
            </div>
        </>
    );
}

export default SubUpdate
