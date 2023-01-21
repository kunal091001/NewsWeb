import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'top',
        language: 'en',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        language: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            page: '1',
            results: [],
            loading: true,
            totalResults: 0,
        }
        document.title = `${this.capitalize(this.props.category)}-'NEWS'`;
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateNews = async () => {
        this.props.setProgress(0);
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&country=${this.props.country}&category=${this.props.category}&language=${this.props.language}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ results: parsedData.results, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {


        this.setState({
            page: this.state.page + 1,
        })
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&country=${this.props.country}&category=${this.props.category}&language=${this.props.language}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        setTimeout(() => {
            this.setState({
                results: this.state.results.concat(parsedData.results),
                totalResults: parsedData.totalResults,
            });
        }, 1500);

    };


    render() {
        let { mode } = this.props;
        return (

            <>
                <h1 className='text-center' style={{ color: mode === 'light' ? '#212529' : 'white' }} >NEWSMONKEY-TOP {this.props.category === 'top' ? '' : this.props.category.toUpperCase()} HEADLINES</h1>
                {this.state.loader && <spinner />}
                {mode === 'light' && this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.results.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.results.length !== this.state.totalResults}
                    loader={<h3>Loading....</h3>}
                >
                    <div className='container'>
                        <div className='row' style={{ backgroundColor: mode === 'light' ? 'white' : '#212529' }}>
                            {this.state.results.map((element) => {
                                return <div className=' my-3 col-md-3 ' style={{ backgroundColor: mode === 'light' ? 'white' : '#212529', color: mode === 'light' ? '#212529' : 'white' }} key={element.url} >
                                    <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ' '} imageUrl={element.image_url ? element.image_url : 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} newsUrl={element.link} mode={mode} author={element.sorce_id ? element.sorce_id : 'Unknown'} date={element.pubDate} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News


