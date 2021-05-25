import React, { useEffect, useState } from 'react';
import SearchBar from '../Searchbar/SearchBar'
import SearchResultRow from '../SearchResultRow/SearchResultRow'
import { searchFlix } from '../../Features/repositoryAPI';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css';

function Search() {

    //searchfunction
    const [movie, setMovieData] = useState([]);
    const [searchTerm, SetSearchTerm] = useState([]);
    let multi = false
    let currPage = 1;
    let search = searchTerm;
    const dispatch = useDispatch();
    

      useEffect(() => {
        searchFlix(dispatch, search, multi, currPage).then((r) => {
            if(search.length < 2) {
                // console.log('no data')
            } else {
                setMovieData(JSON.parse(r))
                console.log(movie)
            }  
        })
        
      }, [searchTerm])

    return (
        <div className="search-component">
            <SearchBar searchTerm={searchTerm} SetSearchTerm={SetSearchTerm} /> 
            <SearchResultRow movie={movie} />
        </div>
    )
}

export default Search;
