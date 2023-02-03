import Lottie from 'lottie-react';
import LoginAnimation from '../lottie/news-phone.json';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Frontpage() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/Signup')
        }, 5000)
    }, [])
    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                <Lottie animationData={LoginAnimation} loop={true}
                />
            </div>

        </>
    )
}

export default Frontpage
