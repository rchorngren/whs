
import { useState } from 'react';
import React from 'react-redux';
import { useSelector } from 'react-redux';
import { STATUS } from '../../Features/genresListOf';

const GenreMenu = () => {

    const status = useSelector(state => state.genresListOf.status);
    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));

    let testMapping = [];
    if(status === STATUS.SUCCESS) {
        console.log(genreList);

        testMapping = genreList.genres.map((genre) => (
            <div className='genreItems' key={genre.name} onClick={() => { console.log(genre.name) }}>{genre.name}</div>

        ))
        console.log(testMapping)
    }

    return (

        <div  className='genreSidebar'>
            <h3 id='genresText'>Genres</h3>
                <div className='sidebarScroll'>
                    <div className='genreItemsContainer'>
                        {testMapping}
                    </div>
                </div>               
        </div>  
    )
}

export default GenreMenu;