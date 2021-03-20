import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { updateChoice, getChoice } from '../../../functions/choice'
import AdminNav from '../../../components/nav/AdminNav'
import ExtraChoiceForm from "../../../components/forms/ExtraChoiceForm";
import Hero from '../../../components/Hero'
import { Typography } from '@material-ui/core';

const ChoiceUpdate = ({ history, match }) => {

    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadChoice()
    }, [])

    const loadChoice = () => getChoice(match.params.slug).then(c => setName(c.data.name))
    //console.log(name)

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateChoice(match.params.slug, { name, price }, user.token)
            .then((res) => {
                //console.log(res);
                setLoading(false);
                setName('');
                setPrice('');
                toast.info(`"${res.data.name}" is updated`)
                history.push("/admin/choice");
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
                    ) : (<Typography variant='h6'  className="mb-3">Update Choice</Typography>)}
                    <ExtraChoiceForm handleSubmit={handleSubmit} name={name} setName={setName} price={price} setPrice={setPrice}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default ChoiceUpdate;
