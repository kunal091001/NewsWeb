import React from "react"
import { useState } from "react"
import LoginAnimation from './animation'
import {
    Link
} from 'react-router-dom'

export default function SignUp() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    );
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(values);
    }
    const handleChange = (event) => {
        const { id, value } = event.target;
        setValues((prev) => {
            return {
                ...prev, [id]: value
            }
        })
    }
    return (
        <>
            <div className="container"  >
                <div className="row vh-100 align-items-center " >
                    <div className="col-md-6 ">
                        <div className='mx-auto  w-100' ><LoginAnimation /></div>
                    </div>
                    <div className="col-md-6 ">
                        <h3 className="text-center fw-bold">Welcome To NewsMonkey</h3>
                        <h6 className="text-center fw-bold">Register now to get latest news.</h6>
                        <form onSubmit={handleSubmit}>
                            <div className="w-100 py-1 fw-semibold">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" placeholder="First name" id='firstName' onChange={handleChange} />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name" id='lastName' onChange={handleChange} />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="exampleFormControlInput1">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange} />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} />
                            </div>
                            <div className="py-4 fw-semibold" >
                                <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                            </div>

                        </form>
                        <p className="text-center fw-semibold">Already Have
                            An Account ? <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Log in</Link></p></div>
                </div>

            </div>
        </>
    )
}

