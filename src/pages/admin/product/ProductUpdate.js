import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import Hero from '../../../components/Hero'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import { getChoices } from '../../../functions/choice'
import FileUpload from '../../../components/forms/FileUpload'
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

import {Typography } from '@material-ui/core';

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    pickup: "",
    quantity: "",
    images: [],
    ingredients: "",
    choices: [],
};

const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('')
    const [choiceOptions, setChoiceOptions] = useState([]);
    const [arrayOfChoices, setArrayOfChoices] = useState([]);
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
    }, []);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadChoices()
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {

            // 1 load single proudct
            setValues({ ...values, ...p.data });
            //console.log('value of choice', p.data.choices)
            //console.log('value of sub', p.data.subs)
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                //console.log('all subs', res)
                setSubOptions(res.data); // on first load, show default subs
            });


            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            let arr2 = [];

            p.data.choices.map((c) => {
                arr2.push(c._id)
            })

            //console.log('ARR2', arr2)
            setArrayOfChoices((prev) => arr2)

            p.data.subs.map((s) => {
                arr.push(s._id);
            });

            //console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work
        });

        

    };

    const loadCategories = () =>
        getCategories().then((c) => {
            //console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
            setCategories(c.data);
        });
    
    const loadChoices = () => getChoices().then(c => {
        //console.log('All choices', c.data)
        setChoiceOptions(c.data)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;
        values.choices = arrayOfChoices;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                //console.log(res.data)
                toast.info(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.warning(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [] });
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value).then((res) => {
            // console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubOptions(res.data);
        });
        console.log("Existing category original", values.category);
        // click back to the original category, show its sub category
        if (values.category._id === e.target.value) {
            loadProduct();
        } else {
            setArrayOfSubs([]);
        }
    };

    return (
        <>
        <Hero title={'Update / Delete Product'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>

                    <div className="col-md-9">
                        <Typography variant='h6' className="mb-3">Update / Delete Product</Typography>
                    {/* {JSON.stringify(values)} */}

                    <div className="pt-2 pb-3">
                        {loading ? (
                            <CircularProgress color="secondary" />
                        ) : <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />}
                    </div>

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfChoices={arrayOfChoices}
                        setArrayOfChoices={setArrayOfChoices}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                        choiceOptions={choiceOptions}

                    />

                </div>
            </div>
        </div>
        </>
    );
};

export default ProductUpdate;
