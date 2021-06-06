
import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { getGenreMovieList } from "../../Features/repositoryAPI";
import { actions } from '../../Features/movieSelected'
import { actions as activeViewActions } from '../../Features/activeView';
import './ChosenGenreUi.css'


const ChosenGenre = () => {

    const genreId = useSelector(state => state.genreSelected)
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState(null);
    const [pageCheck, setpageCheck] = useState('')
    const dispatch = useDispatch();

    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));

    const setID = (id) => {
        dispatch(actions.getMovieID(id));
        dispatch(activeViewActions.selectedMovie());
    }

    

    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setpageCheck(JSON.parse(resp))
            setGenreMovieList(resultsList.results);
            setCurrPage(1)
        }) // eslint-disable-next-line
    },[genreId])

    let posterUrl = ''
    if(genreMovieList != null) {
        posterUrl = sessionStorage.posterSmall;
    }
    
    let gMap = genreList.genres.map((genres, index) => {
        if(genres.id === genreId){
            return <div key={index}>{genres.name}</div>   
        } else {
            return null
        }
    })

    let movieListMap = [];
    if(genreMovieList != null){
        movieListMap = genreMovieList.map((movie, index) => (
            <img src={posterUrl + movie.poster_path} alt="" className='poster'
                onClick={() => { 
                setID(movie.id);    }}     
                key={index}/>
        ))
    }

    
    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setGenreMovieList(resultsList.results) 
            }) // eslint-disable-next-line
    }, [currPage])

    return (
        <div className='genreMovies'>
            <div className='chosenGenre'>
                <h3>Genre: </h3>
                <h3>{gMap}</h3>
            </div>
            
            <div>
                {movieListMap}
                <div className='nextBackButtons'>
                    <div className='pageButtons' id='backButton'
                        onClick={() => {
                            //next button in ChosenGenre
                            if(currPage > 1) {
                                setCurrPage(currPage - 1)
                            }
                            } }>Back</div>
                    <div>{currPage}</div>
                    <div className='pageButtons' id='nextButton' 
                        onClick={() => {
                            //back button in ChosenGenre
                           if(currPage < pageCheck.total_pages) {
                                setCurrPage(currPage + 1)
                           }
                            }}>Next</div>
                </div>
            </div>
        </div>
    )
}
export default ChosenGenre; 