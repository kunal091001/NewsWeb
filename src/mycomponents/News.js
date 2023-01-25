import React, { useEffect, useState, useContext } from 'react'
import NewsItem from "./NewsItem";
import Spinner from './spinner.js'
import PropTypes from 'prop-types'
import NewsContext from '../contexts/NewsContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    useParams
} from 'react-router-dom';




export default function News(props) {


    const { paramCategory, paramLanguage } = useParams();


    const { mode } = useContext(NewsContext);

    let { makeProgress } = props;

    const [results, setResults] = useState([]);
    const [page, setPage] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    console.log(paramCategory);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.title = `${capitalize(paramCategory !== undefined ? paramCategory : ' ')}-'NEWS'`;



    const updateNews = async (props) => {
        makeProgress(10);
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&country=${props?.country}&category=${paramCategory !== undefined ? paramCategory : paramLanguage !== undefined ? 'world' : 'top'}&language=${paramLanguage === undefined ? 'en' : paramLanguage}`;
        setLoading(true);
        makeProgress(30);
        let data = await fetch(url);
        makeProgress(50);
        let parsedData = await data.json();
        makeProgress(70);
        setResults(parsedData.results);
        setTotalResults(parsedData.totalResults);
        makeProgress(100);
        setLoading(false);
        setPage(parsedData.nextPage);
    }



    useEffect(() => {
        if (props.key === 'search') {
            setResults(props.searchValue);
        }
        else {
            updateNews(props);

        }
    }, [paramCategory, paramLanguage])


    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsdata.io/api/1/news?apikey=pub_158551665451f8d544174c6d861ee63033841&country=${props?.country}&category=${paramCategory !== undefined ? paramCategory : paramLanguage !== undefined ? 'world' : 'top'}&language=${paramLanguage === undefined ? 'en' : paramLanguage}&page=${page}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        setTimeout(() => {
            setResults(results.concat(parsedData.results));
            setTotalResults(parsedData.totalResults);
        }, 1000);

        setPage(parsedData.nextPage);
    };


    return (

        <>

            <h1 className='text-center mt-5 pt-4' style={{ color: mode === 'light' ? '#152238' : 'white' }} >NEWSMONKEY-TOP {paramCategory === undefined ? '' : paramCategory.toUpperCase()} HEADLINES</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={results.length !== totalResults}
                loader={<h3><Spinner /></h3>}
            >
                <div className='container'>
                    <div className='row' style={{ backgroundColor: mode === 'light' ? ' #E5EDF1' : '#212529' }}>
                        {results.map((element) => {
                            return <div className=' my-3 col-md-3 ' style={{ backgroundColor: mode === 'light' ? '#E5EDF1' : '#212529', color: mode === 'light' ? '#212529' : 'white', height: '100%' }} key={element.url} >
                                <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ' '} imageUrl={element.image_url ? element.image_url : 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} newsUrl={element.link} author={element.source_id ? element.source_id : 'Unknown'} date={element.pubDate} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>

    )
}

News.defaultProps = {
    country: 'in',
}

News.propTypes = {
    country: PropTypes.string,
}


