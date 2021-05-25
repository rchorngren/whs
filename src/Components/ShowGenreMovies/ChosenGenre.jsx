
import { useEffect, useState } from 'react';
import React from 'react-redux';
import { getGenreMovieList } from "../../Features/repositoryAPI";


const ChosenGenre = () => {

    const [movieList, setMovieList] = useState(null);
    let array = '';
    useEffect(() => {
        getGenreMovieList(28, 1).then((r) => {
            array = JSON.parse(r);

            console.log(array);
        })
        
    })

    return (
        <div className='hej'>

        </div>
    )
}
export default ChosenGenre; 