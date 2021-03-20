import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import Hero from '../../../components/Hero'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { getChoices } from '../../../functions/choice'
import FileUpload from '../../../components/forms/FileUpload'
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Typography, Box, } from '@material-ui/core';

const initialState = {
    title: "",
    description: "",
    ingredients: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    pickup: "",
    quantity: "",
    images: [],
    choices: []
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([])
    const [choiceOptions, setChoiceOptions] = useState([]);
    const [showSub, setShowSub] = useState(false)
    const [loading, setLoading] = useState(false)

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    // get categories and assign to values
    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        loadChoices()
    }, [])

    const loadCategories = () => getCategories().then(c => setValues({ ...values, categories: c.data }))
    const loadChoices = () => getChoices().then(c => setChoiceOptions(c.data))

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                //console.log('product created', res);
                window.alert(`"${res.data.title}" is created`)
                window.location.reload()

            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.warning(err.response.data.err)
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };


    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('Clicked Category', e.target.value)
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                //console.log('Sub opstions on category click', res)
                setSubOptions(res.data)
            })
        setShowSub(true)
    }

      return (
        <>
           <Hero title={'Create Product'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>

                    <div className="col-md-9">
                        <Typography variant='h6'  className="mb-3">Create Product</Typography>

                    <div className="pt-2 pb-3">
                        {loading ? (
                            <CircularProgress color="secondary" />
                        ) : <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />}

                    </div>

                    <ProductCreateForm
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        choiceOptions={choiceOptions}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductCreate;
