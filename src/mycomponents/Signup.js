import React from "react"
import { useState, useContext } from "react"
import LoginAnimation from './animation'
import {
    Link,
    useNavigate
} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from "../config/fire";
import NewsContext from "../contexts/NewsContext";
import { GoogleButton } from 'react-google-button';


export default function SignUp() {

    const { userData, setUserData } = useContext(NewsContext);

    const navigate = useNavigate();
    const [submitButton, setSubmitButton] = useState(false);

    const [errormsg, setErrormsg] = useState('');
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.password.length < 8) {
            return setErrormsg('Password Must Be Of 8 Characters !');
        }
        setErrormsg('');
        setSubmitButton(true);
        createUserWithEmailAndPassword(auth, values.email, values.password).then(
            async (res) => {
                setSubmitButton(false);
                const user = res?.user;
                await updateProfile(user, {
                    displayName: values.firstName.concat(values.lastName),
                });
                setUserData({ email: user.email, firstName: user.displayName });

                navigate('/home');


            }
        ).catch(error => {
            setSubmitButton(false);
            setErrormsg(error.message);
        });
    }


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider).then((res) => {
            setUserData({ email: res.user.email, firstName: res.user.displayName });
            navigate('/home');
        })
    };


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
                        <div className='mx-auto w-100' ><LoginAnimation /></div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 ">
                        <h3 className="text-center fw-bold">Welcome To NewsMonkey</h3>
                        <h6 className="text-center fw-bold">Register Now To Get Latest News.</h6>
                        <form onSubmit={handleSubmit}>
                            <div className="w-100 py-1 fw-semibold">
                                <label htmlFor="firstName">First Name </label>
                                <input type="text" className="form-control" placeholder="First name" id='firstName' onChange={handleChange} required />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name" id='lastName' onChange={handleChange} />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="exampleFormControlInput1">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange} required />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} required />
                            </div>
                            {errormsg && <p className="pt-2 w-100 fw-semibold text-danger " >
                                {errormsg}
                            </p>}
                            <div className="pt-2 pb-4 fw-semibold" >
                                <button type="submit" className="btn btn-dark w-100" disabled={submitButton}>Sign Up</button>
                            </div>
                            <div className=" pb-4 fw-semibold ">
                                <GoogleButton className='w-100' onClick={handleGoogleSignIn} />
                            </div>


                        </form>
                        <p className="text-center fw-semibold">Already Have
                            An Account ? <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

