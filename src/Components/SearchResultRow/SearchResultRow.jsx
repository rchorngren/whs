import React, { useEffect } from 'react'
import './SearchResultRow.css'

const SearchResultRow = (props) => {
    const url = 'https://image.tmdb.org/t/p/w200';
 

    try {
        if (props.movie.results) {
            return (
                <div className="search-result-component">
                {props.movie.results.map((movie, index) => 
                <table className="results" key={index}>
                    <tbody>
                        <tr>
                            <td>
                                <img alt="movie poster" 
                                        src={props.movie.results[index].poster_path ? url + props.movie.results[index].poster_path: logo} 
                                    />
                                </td>
                            <td>
                                <h3>{props.movie.results[index].title}</h3>
                                <p>{props.movie.results[index].overview}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                )}
                </div>
            )
        }
        return (
            null
        )
        
    } catch (e) {
        console.log(e)
    }
    }

export default SearchResultRow;
