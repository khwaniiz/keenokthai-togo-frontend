import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCategory, updateCategory } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from "../../../components/forms/CategoryForm";
import Hero from '../../../components/Hero'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const CategoryUpdate = ({ history, match }) => {

    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => getCategory(match.params.slug).then(c => setName(c.data.name))
    //console.log(name)

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateCategory(match.params.slug, { name }, user.token)
            .then((res) => {
                //console.log(res);
                setLoading(false);
                setName('');
                toast.info(`"${res.data.name}" is updated`)
                history.push("/admin/category");
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.warning(err.response.data)
            })
    }

    return (

        <>
        <Hero title={'Update Category'}/>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                         <div className="col-md-3">
                            <AdminNav />
                         </div>
                         <div className="col-md-9">
                    {loading ? (
                        <Spin indicator={antIcon} />
                    ) : (<Typography variant='h6'  className="mb-3">Update Category</Typography>)}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryUpdate;
