
import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';
import { getGenreMovieList } from "../../Features/repositoryAPI";
import './ChosenGenreUi.css'


const ChosenGenre = () => {

    const genreId = useSelector(state => state.genreSelected)
    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState(null);
    const dispatch = useDispatch();

    const status2 = useSelector(state => state.genresListOf.status);
    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));
    
   console.log('GenreId: ', genreId);
    console.log('GenreList: ', genreList);

    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setGenreMovieList(resultsList.results);
        })

    }, [genreId])

    let posterUrl = ''
    if(genreMovieList != null) {
        posterUrl = sessionStorage.posterSmall;
        //console.log('PosterUrl:', posterUrl)
    }
    
    console.log('GenreMovieList', genreMovieList);
    let gMap = genreList.genres.map((genres) => {
        if(genres.id === genreId){
            return <div>{genres.name}</div>
            
        }
    })

    let movieListMap = [];
    //console.log('MovieListResults', genreMovieList);
    if(genreMovieList != null){
        movieListMap = genreMovieList.map((movie) => (
            <img src={posterUrl + movie.poster_path} alt="" className='poster'
                onClick={() => { console.log(movie.title) }}     
                key={movie.title}/>
        ))
    }

    // const testFunction = () => {
        
    // }

    // genreList.forEach(testFunction)


    //console.log('MovieListMap', movieListMap)
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
                            const newPage = currPage - 1;
                                if(newPage >= 1) {
                                    setCurrPage(newPage)
                                    getGenreMovieList(dispatch, genreId, newPage).then((resp) => {
                                    const resultsList = JSON.parse(resp);
                                    setGenreMovieList(resultsList.results)
                                })}
                                } }>Back</div>
                    <div className='pageButtons' id='nextButton' 
                        onClick={() => {
                            //back button in ChosenGenre
                            const newPage = currPage + 1;
                            setCurrPage(newPage)
                            getGenreMovieList(dispatch, genreId, newPage).then((resp) => {
                                const resultsList = JSON.parse(resp);
                                setGenreMovieList(resultsList.results);
                            })} }>Next</div>
                </div>
            </div>
        </div>
    )
}
export default ChosenGenre; 