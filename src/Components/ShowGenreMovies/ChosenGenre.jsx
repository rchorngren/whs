
import { useEffect, useState } from 'react';
import React, { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';
import { getGenreMovieList } from "../../Features/repositoryAPI";


const ChosenGenre = () => {

    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let genreId = 28;

    
    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            setGenreMovieList(JSON.parse(resp));
        })
    }, [])

    useEffect(() => {
        if(status === STATUS.FINISHED) {
            setContent(genreMovieList.results[0].title);
        }
    }, [genreMovieList])

    return (
        <div className='hej'>
            {content}
            Hej
        </div>
    )
}
export default ChosenGenre; 