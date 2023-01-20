import React, { Component } from 'react'
import Hello from './hello.jpg'
export class NewsItem extends Component {

  render(props) {
    let { title, description, imageUrl, newsUrl, mode, author, date } = this.props;
    return (
      <div>
        <div className="card" style={{ backgroundColor: mode === 'light' ? 'white' : '#36454f', Color: mode === 'light' ? 'white' : '#212529' }}>
          <img src={imageUrl ? imageUrl : { Hello }} className="card-img-top " style={{ height: "200px" }} alt='News' />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text" style={{}} >{description}</p>
            <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
export default NewsItem
