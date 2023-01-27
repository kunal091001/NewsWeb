import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import NewsContext from '../contexts/NewsContext';
import {
  useNavigate
} from 'react-router-dom';

export default function NavBar(props) {
  const val = useContext(NewsContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    val.setUserValue(event.target.value);
  }

  function isPattern(userInput) {
    return /^[a-z]/i.test(userInput);
  }


  const getFirstWord = (user) => {
    const words = user.split(' ');
    return words[0];
  }

  val.setUserValue(getFirstWord(val.userValue));


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(val.userValue);

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
      console.log(error);
      alert('Results Not Found');
      alert('Redirecting To HOME Page')
      navigate('/');

    }
  }

  return (
    <div>

      <nav className={`navbar navbar-expand-lg fixed-top`} style={{ backgroundColor: val.mode === 'light' ? 'white' : '#36454f', }}>
        <div className="container-fluid">
          <span className="navbar-brand " style={{ color: val.mode === 'light' ? '#152238' : 'white' }} >NEWSMONKEY</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/entertainment" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Entertainment
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/business" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Business
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/health" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Health
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/science" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Science
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/sports" role="button" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Sports
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/category/technology" role="button" aria-expanded="false" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>
                  Technology
                </Link>
              </li>
              <li className='nav-item dropdown mx-md-5'>
                <div className='d-flex '>
                  <Link to="/language/hi" className='nav-link' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>हिंदी</Link>
                  <strong className='mt-2' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}> / </strong>
                  <Link to="/language/en" className='nav-link' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>English</Link>
                </div>
              </li>
            </ul>
            <div className="form-check form-switch mx-md-4">
              <input onClick={val.toggleMode} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: val.mode === 'light' ? '#152238' : 'white' }}>{val.mode} Mode</label>
            </div>
            <form className="d-flex" role="search" method='get' onSubmit={handleSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search one word only" aria-label="Search" onChange={handleChange} name='searchbar' required />
              <button className="btn btn-outline-success" type="submit" role='search' style={{ color: val.mode === 'light' ? '#152238' : 'white' }}   >Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}





