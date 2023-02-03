import React, { useContext } from 'react'
import NewsContext from '../contexts/NewsContext';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../config/fire";


export default function NavBar(props) {


  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const val = useContext(NewsContext);

  const navigate = useNavigate();


  const logOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleChange = (event) => {
    val.setUserValue(event.target.value);
  }

  function isPattern(userInput) {
    return /^[a-z]/i.test(userInput);
  }


  const getFirstWord = (user) => {
    const words = user?.split(' ');
    return words[0];
  }

  val.setUserValue(getFirstWord(val?.userValue));


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isPattern(val.userValue)) {
        throw Error;
      }
      else {
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&q=${val.userValue}`
        let data = await fetch(url);

        let parsedData = await data.json();

        val.setSearchValue(parsedData);
        navigate(`/query/${val.userValue}`);
      }

    }
    catch (error) {
      alert('Results Not Found');
      alert('Redirecting To HOME Page')
      navigate('/');

    }
  }

  return (
    <div>

      <nav className={`navbar navbar-expand-lg fixed-top`} style={{ backgroundColor: val.mode === 'light' ? 'white' : '#36454f', }}>

        <div className="container-fluid">
          <Link className="navbar-brand fw-bold " to='/home' style={{ color: val.mode === 'light' ? '#152238' : 'white' }} >NEWSMONKEY</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  " >
              <li className="nav-item dropdown mx-md-2 ">
                <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  News Categories
                </span>
                <ul className="dropdown-menu " style={{ backgroundColor: val.mode === 'light' ? 'white' : '#36454f', }}>
                  <li className="dropdown-item fw-semibold" >
                    <Link className="nav-link " to="/category/entertainment" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Entertainment
                    </Link>
                  </li>
                  <li className="dropdown-item fw-semibold">
                    <Link className="nav-link " to="/category/business" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Business
                    </Link>
                  </li>
                  <li className="dropdown-item fw-semibold">
                    <Link className="nav-link " to="/category/health" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Health
                    </Link>
                  </li>
                  <li className="dropdown-item fw-semibold">
                    <Link className="nav-link " to="/category/science" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Science
                    </Link>
                  </li>
                  <li className="dropdown-item fw-semibold">
                    <Link className="nav-link " to="/category/sports" role="button" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Sports
                    </Link>
                  </li>
                  <li className="dropdown-item fw-semibold">
                    <Link className="nav-link " to="/category/technology" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                      Technology
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item  mx-md-2'>
                <div className='d-flex '>
                  <Link to="/language/hi" className='nav-link fw-semibold' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>हिंदी</Link>
                  <strong className='mt-2' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}> / </strong>
                  <Link to="/language/en" className='nav-link fw-semibold' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>English</Link>
                </div>
              </li>
            </ul>
            <div className=" mx-md-4 fw-semibold p-2 p-md-0 ">
              <div className='d-flex '>
                <input type="checkbox" className="checkbox" id="checkbox" onChange={val.toggleMode} />
                <label htmlFor="checkbox" className="label">
                  <i className="bx bx-sun icon"></i>
                  <i className="bx bx-moon icon"></i>
                  <div className='ball' />
                </label>
              </div>
            </div>
            <form className="d-flex  my-3 my-md-0" role="search" method='get' onSubmit={handleSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search one word only" aria-label="Search" onChange={handleChange} name='searchbar' required />
              <button className="btn btn-outline-success fw-semibold" type="submit" role='search' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}   >Search</button>
            </form>
            <div className='dropdown px-md-5 ms-md-3 my-3 my-md-0'>
              <span className=" dropdown-toggle fw-bold" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                <i className="bx bx-user icon  "> User</i>
              </span>
              <ul className="dropdown-menu " style={{ backgroundColor: val.mode === 'light' ? 'white' : '#36454f', }}>
                <li>
                  <Link className="dropdown-item fw-semibold " to="/profile" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                    {val?.userData?.firstName}
                  </Link>
                </li>
                <li className="dropdown-item fw-semibold " role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }} onClick={logOut}>
                  <i className="bx bx-log-out icon fw-semibold" > Log Out</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}





