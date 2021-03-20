import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Spin } from "antd";
import { LoadingOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import Hero from '../../../components/Hero'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '2rem',
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        margin: '1.5rem 0'
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


const CategoryCreate = () => {
    const classes = useStyles();  
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Search Filter 1
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    //console.log(categories)

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name)
        setLoading(true)
        createCategory({ name }, user.token)
            .then((res) => {
                //console.log('res', res);
                setLoading(false);
                setName('');
                toast.info(`"${res.data.name}" is created`)
                loadCategories()
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
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`)
                    loadCategories()
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
                    ) : ( <Typography variant='h6'  className="mb-3">Create Category</Typography>)}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                    {/* Search Filter 2 */}

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* Search Filter 5 */}
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className={classes.resultContainer} key={c._id}>
                            <Typography variant='subtitle2' color='secondary'>{c.name}  <span onClick={() => handleRemove(c.slug)} className='btn btn-sm float-right'>
                                <DeleteOutlined className='text-danger' />
                                </span>
                                
                                <Link to={`/admin/category/${c.slug}`}><span className="btn btn-sm float-right">
                                <EditOutlined className='text-warning' />
                                </span>
                            </Link>
                                </Typography>
                           
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryCreate;
