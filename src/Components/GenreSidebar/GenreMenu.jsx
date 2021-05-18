
import { useState } from 'react';
import React from 'react-redux';
import { useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';

const GenreMenu = () => {

    const status = useSelector(state => state.genresListOf.status);
    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));

    let genreArray = [];
    if(status === STATUS.SUCCESS) {
        console.log(genreList);
        
        for(let i = 0; i < genreList.genres.length; i++) {
            genreArray.push(<div className='genreItems' key={i}>{genreList.genres[i].name}</div>)
        } 
    }


    return (
        <div className='genreSidebar'>
            <h3 id='genresText'>Genres</h3>
            <div className='genreItemsContainer'>
                {genreArray}
            </div>
        </div>
    )
}

export default GenreMenu;