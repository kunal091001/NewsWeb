import React, { useContext } from 'react'
import Hello from './hello.jpg'
import NewsContext from '../contexts/NewsContext';
export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  const val = useContext(NewsContext);

  return (
    <>
      <div className="card" style={{ backgroundColor: val.mode === 'light' ? 'white' : '#36454f', Color: val.mode === 'light' ? 'white' : '#212529' }}>
        <img src={imageUrl ? imageUrl : { Hello }} className="card-img-top " style={{ height: "200px" }} alt='News' />
        <div className="card-body" >
          <h6 className="card-title">{title}</h6>
          <div className='mydiv' style={{ height: '25vh' }} ><p className="card-text para" >{description}</p></div>
          <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </>
  )
}


