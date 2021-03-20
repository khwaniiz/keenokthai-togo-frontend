import axios from "axios";

export const getOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
        headers: {
            authtoken,
        },
    });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        }
    );

export const changeSendStatus = async (orderId, sendStatus, authtoken) => 
    await axios.put(
        `${process.env.REACT_APP_API}/admin/order-send-status`,
        { orderId, sendStatus },
        {
            headers: {
                authtoken,
            },
        }
    );


export const getAllUsers = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/admin/users`, {
        headers: {
            authtoken,
        },
    });
