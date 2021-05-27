
import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';
import { getGenreMovieList } from "../../Features/repositoryAPI";
import './ChosenGenreUi.css'


const ChosenGenre = () => {

    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState(null);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let genreId = 18;

   
    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setGenreMovieList(resultsList.results);
        })

    }, [])

    let posterUrl = ''
    if(genreMovieList != null) {
        posterUrl = sessionStorage.posterSmall;
        console.log('PosterUrl:', posterUrl)
    }
    
    console.log('GenreMovieList', genreMovieList);

    let movieListMap = [];
    console.log('MovieListResults', genreMovieList);
    if(genreMovieList != null){
        movieListMap = genreMovieList.map((movie) => (
            //<div key={movie.title}>{movie.title}</div>
            <img src={posterUrl + movie.poster_path} alt="" className='poster'
                onClick={() => { console.log(movie.title) }}/>
        ))
    }

    console.log('MovieListMap', movieListMap)
    return (
        <div className='genreMovies'>
            <div className='pickedGenre'>
                {movieListMap}
            </div>
        </div>
    )
}
export default ChosenGenre; 