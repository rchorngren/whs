import React, { useEffect, useState } from 'react';
import SearchBar from '../Searchbar/SearchBar'
import SearchResultRow from '../SearchResultRow/SearchResultRow'
import { searchFlix } from '../../Features/repositoryAPI';

function Search() {

    //searchfunction
    const [movie, setMovieData] = useState([]);
    const [searchTerm, SetSearchTerm] = useState([]);
    let multi = false
    let currPage = 1;
    let search = searchTerm;
    

      useEffect(() => {
        searchFlix(search, multi, currPage).then((r) => {
            if(search.length < 2) {
                // console.log('no data')
            } else {
                setMovieData(JSON.parse(r))
                console.log(movie)
            }  
        })
        
      }, [searchTerm])

    return (
        <>
        <div>
            <SearchBar searchTerm={searchTerm} SetSearchTerm={SetSearchTerm} /> 
        </div>
        <div>
            <SearchResultRow movie={movie} />
        </div>
        
        </>
    )
}

export default Search
