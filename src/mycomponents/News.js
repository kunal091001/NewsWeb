import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './spinner.js'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'top',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.string,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            page: 'page',
            results: [],
            loading: false
        }
    }

    updateNews = async () => {
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&country=${this.props.country}&category=${this.props.category}`;
        // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9da7c88258f74cad8b8e32dc48a15d7c&page=${this.state.page}&pagesize=${this.props.pageSize}
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ results: parsedData.results, totalResults: parsedData.totalResults, loading: false })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handleNext = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();

    }

    handlePrev = async () => {
        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();

    }

    render() {
        let { mode } = this.props;
        return (

            <div className='container my-3' style={{ backgroundColor: mode === 'light' ? 'white' : '#212529' }}>
                <h1 className='text-center' style={{ color: mode === 'light' ? '#212529' : 'white' }} >NEWSMONKEY</h1>
                {mode === 'light' && this.state.loading && <Spinner />}
                <div className='row' style={{ backgroundColor: mode === 'light' ? 'white' : '#212529' }}>
                    {!this.state.loading && this.state.results.map((element) => {
                        return <div className=' my-3 col-md-3 ' style={{ backgroundColor: mode === 'light' ? 'white' : '#212529', color: mode === 'light' ? '#212529' : 'white' }} key={element.url} >
                            <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ' '} imageUrl={element.image_url ? element.image_url : 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} newsUrl={element.link} mode={mode} author={element.source_id ? element.source_id : 'Unknown'} date={element.pubDate} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className='btn btn-dark' onClick={this.handleNext}> Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
