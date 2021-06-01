
import { useEffect, useState } from 'react';
import React, { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actions } from '../../Features/genreSelected';
import { STATUS } from '../../Features/genresListOf';
import { getGenre } from '../../Features/repositoryAPI';
import ChosenGenre from '../ShowGenreMovies/ChosenGenre';


const GenreMenu = () => {
    
    const status = useSelector(state => state.genresListOf.status);
    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));
    const dispatch = useDispatch();

    useEffect(() => {
       getGenre(dispatch);
    }, [])


    let genreListMap = [];
    if(status === STATUS.SUCCESS) {
        //console.log('GenreList', genreList);
        genreListMap = genreList.genres.map((genre) => (
            <div className='genreItems' key={genre.name} 
                onClick={() => { 
                    console.log(genre.name, genre.id);
                    dispatch(actions.genreClicked(genre.id));
                 } }>{genre.name}</div>
        ))
        //console.log('GenreListMap', genreListMap)
    }    
    
    return (
        <div  className='genreSidebar'>
            <h3 id='genresText'>Genres</h3>
                <div className='sidebarScroll'>
                    <div className='genreItemsContainer'>
                        {genreListMap}
                    </div>    
                </div>           
        </div>  
    )
}

export default GenreMenu;