import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ScrollContainer from 'react-indiana-drag-scroll';
import { getFlixDetail } from '../../Features/repositoryAPI';
import { actions } from '../../Features/customerBasket';
import { getMovieReviewRating } from '../../Features/repositoryFS';
import './SelectedMovie.css';

const SelectedMovie = () => {
    const url = 'https://image.tmdb.org/t/p/w200';
    const movieId = useSelector(state => state.movieSelected.id);;
    const [flixDetail, setFlixDetail] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const dispatch = useDispatch();
    const [imdbRating, SetImdbRating] = useState([]);
    const [imdbID, SetImdbId] = useState([]);
    let id = movieId;
    const urlRating ='http://www.omdbapi.com/?i='
    const apiKey = '&apikey=fbdcb121'
    const [response, setResponse] = useState([]);
    const [content, setContent] = useState('Loading...');
    const [reviews, setReviews] = useState([]);
    const [reviewsArray, setReviewsArray] = useState([]);

    useEffect(() => {
        getFlixDetail(dispatch, id).then((resp) => { setFlixDetail(JSON.parse(resp))

            if(JSON.parse(resp).imdb_id !== null) {
                SetImdbId(JSON.parse(resp).imdb_id)
            }
        });
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    //Test method 1

    useEffect(() => {
        getMovieReviewRating(id).then((resp) => {
            setResponse(JSON.parse(resp))
        })
    }, [])

    useEffect(() => {
        if(response.length !== 0 ) {
            for (let i=0; i < response.reviews.length; i++){
                console.log(response.reviews[i].comment);
                console.log(response);
            }  
        } 
    }, [response])

    // function GetUserReview() {

    //     if (response.length !== 0 ) {
    //         for (let i=0; i < response.reviews.length; i++) {
    //             return (
    //                 <div className="user-review">
    //                     <div className="user-review-text">
    //                        {response.reviews[i].comment}
    //                     </div>
    //                 </div>
    //             )
    //         }
    //     } 
    // }

    const GetUserReview = () => {
        try{
            if (response.length !== 0) {
                for (let i=0; i < response.reviews.length; i++) {
                    return (
                        
                        <div className="user-review">
                                <div className="user-review-text">
                                    {response.reviews[i].comment}
                                </div>
                                <div className="user-review-rating"> 
                                Rating: {response.reviews[i].rate}
                                </div>
                        </div>
                       
                    )
                }
            } else {
                return (
                    <div className="user-review">
                        <div className="user-review-text">
                            No reviews found
                        </div>
                    </div>
                )
            }
        } catch(e) {
            console.log(e)
        }
    }



    
    //test method 2
    // useEffect(() => {
    //     getMovieReviewRating(id).then((resp) => {
    //         setResponse(JSON.parse(resp));
    //     })
    // }, []);

    // useEffect(() => {
    //     if(response !== '') {
    //         if(response == null) {
    //             setContent('user not logged in')
    //         } else if (response.reviews.length === 0) {
    //             setContent('No reviews found')
    //         } else {
    //             setReviews(response.reviews)
    //         }
    //     }
    // }, [response])

    // useEffect(() => {
    //     if(reviews !== []) {
    //         setReviewsArray(reviews)
    //     }
    // }, [reviews])

    function buyMovie() {
        const movieToBuy = {"movieId": flixDetail.id, "movieTitle": flixDetail.original_title, "price": 4.99};
        dispatch(actions.addItem(movieToBuy));
    }

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 150);
        setTimeout(() => {
            buyMovie();
        }, 250);
    }

    async function getIMDBRating() {
            try {
                let resp = await fetch(urlRating + imdbID + apiKey);
                let data = await resp.json();
                
                
                if(imdbID.length) {
                    if(data.imdbRating !== "N/A"){
                        if(data.Response !== 'False') {
                            SetImdbRating(data.imdbRating + "/10")
                           
                        }else {
                            SetImdbRating('No Rating Found')
                        }
                        
                        
                    } 
                    
                } else {
                    SetImdbRating('No Rating Found')
                }
              
            }
            catch (error) {
                console.log(error);
            }
}
        

    useEffect(() => {
        getIMDBRating() // eslint-disable-next-line
    }, [imdbID])

    return (
        <ScrollContainer className="individual-movie-component">

            <div className="movie-info">
                <div className="movie-poster">
                    <img src={flixDetail.poster_path ? url + flixDetail.poster_path : null} alt="" />
                </div>

                <div className="movie-info-container">
                    <div className="movie-title-text">{flixDetail.original_title}</div>
                    <div className="movie-info-text">{flixDetail.overview}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <div className="user-rating-container">
                    IMDB rating<br />
                    <div className="user-rating-score-text">{imdbRating}</div>
                </div>

                <div className="movie-price-text">
                    Price <br />
                    $4.99
                </div>
            </div>

            <div>
                <div className={buttonClicked ? "buy-button clicked" : "buy-button"} onClick={() => { setButtonClicked(true); animationOnClick() }}>Buy</div>
            </div>

            <div className="user-review-container">
                <div className="user-review-header">User reviews</div>
                    {/* method 2*/}
                    {/* {reviewsArray.length > 0 ?

                        reviewsArray.map((item, index) =>
                            <div className="user-review" key={index}>
                                <div className="user-review-text">
                                    {item.comment}
                                </div>
                            </div>
                        )
                        :
                        <div className="user-review">
                            <div className="user-review-text">
                                {content}
                            </div>
                        </div>
                    } */}
                
                {/*test method one */}
                <GetUserReview />
                
            </div>


        </ScrollContainer>
    )
}

export default SelectedMovie;