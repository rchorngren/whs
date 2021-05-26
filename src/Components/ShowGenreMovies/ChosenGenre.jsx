
import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';
import { getGenreMovieList } from "../../Features/repositoryAPI";
import './ChosenGenreUi.css'


const ChosenGenre = () => {

    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let genreId = 16;
    
    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setGenreMovieList(resultsList.results);
        })

    }, [])

    let movieListMap = [];
    useEffect(() => {
        if(status === STATUS.FINISHED) {
            setContent(genreMovieList[0].title);
        }       
        console.log('GenreMovieList', genreMovieList);
       
    }, [genreMovieList])

     
    console.log('MovieListResults', genreMovieList);

    movieListMap = genreMovieList.map((movie) => (
        <div key={movie.title}>{movie.title}</div>
    ))
    
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