import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminNav from '../../../components/nav/AdminNav'
import Hero from '../../../components/Hero'
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";

import { Spin } from "antd";
import { LoadingOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, } from '@material-ui/core';

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


const SubCreate = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);
    const classes = useStyles();    

    // Search Filter 1
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    // console.log(categories)

    const loadSubs = () => getSubs().then((s) => setSubs(s.data))

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.info(`"${res.data.name}" is created`)
                loadSubs();
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.warning(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        //    let answer = window.confirm('Delete?')
        //    console.log(answer, slug)
        if (window.confirm('Delete?')) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`)
                    loadSubs()
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.warning(err.response.data)
                    }
                })
        }
    }

    // Search Filter 4
    const searched = (keyword) => (c => c.name.toLowerCase().includes(keyword))


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
                        ) : (<Typography variant='h6'  className="mb-3">Create sub category</Typography>)}

            <Box className={classes.inputContainer}>
            <label className={classes.label}>Main category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
              style={{fontFamily: 'Nunito',
              color: '#fca311',}}
            >
              <option className={classes.option}>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </Box>
                        {/* {JSON.stringify(category)} */}
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />


                        {/* Search Filter 2 */}

                        <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                        {/* Search Filter 5 */}
                        {subs.filter(searched(keyword)).map((s) => (
                            <div  className={classes.resultContainer} key={s._id}>
                                  <Typography variant='subtitle2' color='secondary'>
                                {s.name} <span onClick={() => handleRemove(s.slug)} className='btn btn-sm float-right'><DeleteOutlined className='text-danger' /></span>
                                <Link to={`/admin/sub/${s.slug}`}><span className="btn btn-sm float-right"><EditOutlined className='text-warning' /></span></Link>
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubCreate
