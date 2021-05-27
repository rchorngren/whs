
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
    const [poster, setPoster] = useState('')
    let genreId = 16;

    
    
    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            const resultsList = JSON.parse(resp);
            setGenreMovieList(resultsList.results);
        })

    }, [])

    let myPosterUrl = ''
    if(genreMovieList != null) {
        let posterName = genreMovieList[0].poster_path
        myPosterUrl = sessionStorage.posterSmall + posterName;
        console.log('PosterUrl:', myPosterUrl)
    }
    

    let movieListMap = [];
    useEffect(() => {
        if(status === STATUS.FINISHED) {
            setContent(genreMovieList[0].title);
        }       
        console.log('GenreMovieList', genreMovieList);
       
    }, [genreMovieList])

     //for each movie in genre, poster.
    console.log('MovieListResults', genreMovieList);
    if(genreMovieList != null){
        movieListMap = genreMovieList.map((movie) => (
            <div key={movie.title}>{movie.title}</div>
            //<img src={myPosterUrl} alt="" />
        ))
    }
    // {movieListMap}   <img src={myPosterUrl} alt="" />
    
    console.log('MovieListMap', movieListMap)
    return (
        <div className='genreMovies'>
            <img src={myPosterUrl} alt="" className='poster'/>
            <img src={myPosterUrl} alt="" className='poster'/>
            <img src={myPosterUrl} alt="" className='poster'/>
            <img src={myPosterUrl} alt="" className='poster'/>
            <img src={myPosterUrl} alt="" className='poster'/>
            <div className='pickedGenre'>
                
            </div>
        </div>
    )
}
export default ChosenGenre; 