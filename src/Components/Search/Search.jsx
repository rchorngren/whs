import React, { useEffect, useState } from 'react';
import SearchBar from '../Searchbar/SearchBar'
import SearchResultRow from '../SearchResultRow/SearchResultRow'
import { searchFlix } from '../../Features/repositoryAPI';
import { useDispatch } from 'react-redux';
import './Search.css';

function Search() {
    const [movie, setMovieData] = useState([]);
    const [searchTerm, SetSearchTerm] = useState([]);
    const [currPage, SetCurrPage] = useState(1)
    let multi = false
    let search = searchTerm;
    const dispatch = useDispatch();
    const [searching, SetSearching] = useState(false)
    

      useEffect(() => {
        SetCurrPage(1)
        searchFlix(dispatch, search, multi, currPage).then((r) => {
            if(search.length >= 2) {
                setMovieData(JSON.parse(r));
                SetSearching(true)
            }  
        })
         // eslint-disable-next-line
      }, [searchTerm])

      useEffect(() => {
        searchFlix(dispatch, search, multi, currPage).then((r) => {
            if(search.length >= 2) {
                setMovieData(JSON.parse(r))
            }
        })
         // eslint-disable-next-line
      }, [currPage])

      const previousPage = () => {
          //go back 1 page
          if(currPage > 1) {
            SetCurrPage(currPage - 1)
          }
      }

      const nextPage = () => {
          //go forward 1 page
          if(currPage < movie.total_pages) {
            SetCurrPage(currPage + 1)
          }
      }

      const pageButtons = () => {
          if(searching) {
              return (
                <p className="pages"><span onClick={() => {
                    previousPage()
                    }}>prev</span>{currPage}<span onClick={() => {
                    nextPage()
                    }}>next</span></p>
              )
                
          }
      }
    return (
        <>
        <div className="search-component">
            <SearchBar searchTerm={searchTerm} SetSearchTerm={SetSearchTerm} /> 
            <SearchResultRow movie={movie} />
            {pageButtons()}
        </div>
        
        </>
    )
}

export default Search;
