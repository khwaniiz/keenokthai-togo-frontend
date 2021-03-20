import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Spin } from "antd";
import { LoadingOutlined,} from "@ant-design/icons";

const LoadingToRedirect = () => {

    const [count, setCount] = useState(5);
    let history = useHistory()

    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;


    useEffect(()=> {
const interval = setInterval(() => {
    setCount((currentCount) => --currentCount)
}, 1000)

// redirect once count is equal to 0

count === 0 && history.push('/')
// cleanup

return () => clearInterval(interval);
    }, [count, history])

    return (
        <div className='container p-5 text-center'>
            <Spin indicator={antIcon} />
    <p>Redirecting {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect
