import React, { useState, useContext } from 'react'
import LoginAnimation from './animation'
import {
    Link, useNavigate
} from 'react-router-dom'
import { auth, provider } from "../config/fire";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import NewsContext from "../contexts/NewsContext";
import GoogleButton from 'react-google-button';



export default function Login() {

    const val = useContext(NewsContext);

    const { userData, setUserData } = useContext(NewsContext);

    const navigate = useNavigate();
    const [submitButton, setSubmitButton] = useState(false);

    const [errormsg, setErrormsg] = useState('');
    const [values, setValues] = useState({
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
        signInWithEmailAndPassword(auth, values.email, values.password).then(
            async (res) => {
                setSubmitButton(false);
                setUserData({ email: res.user.email, firstName: res.user.displayName });
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
                        <div className='mx-auto  w-100' ><LoginAnimation /></div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 ">
                        <h3 className="text-center fw-bold" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>Welcome To NewsMonkey</h3>
                        <h6 className="text-center fw-bold" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>Login Now To Get Latest News.</h6>
                        <form onSubmit={handleSubmit}>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="exampleFormControlInput1" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange} />
                            </div>
                            <div className=" w-100 py-1 fw-semibold">
                                <label htmlFor="inputPassword" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} />
                            </div>
                            {errormsg && <p className="pt-2 w-100 fw-semibold text-danger " style={{ color: val.mode === 'light' ? '#152238' : 'white' }} >
                                {errormsg}
                            </p>}
                            <div className="py-4 fw-semibold" >
                                <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={submitButton} style={{ color: 'white' }}>Log In</button>
                            </div>
                            <div className=" pb-4 fw-semibold ">
                                <GoogleButton className='w-100' onClick={handleGoogleSignIn} />
                            </div>

                        </form>
                        <p className="text-center fw-semibold" style={{ color: val.mode === 'light' ? '#152238' : 'white', textDecoration: 'none' }}>New User ? <Link to="/signup" style={{ color: val.mode === 'light' ? '#152238' : 'white', textDecoration: 'none' }}>Sign Up </Link></p></div>
                </div>

            </div>
        </>
    )
}
