import React, { useEffect } from 'react'
import './SearchResultRow.css'

const SearchResultRow = (props) => {
    const url = 'https://image.tmdb.org/t/p/w200';
 

    try {
        if (props.movie.results) {
            return (
                <>
                <div>
                {props.movie.results.map((movie, index) => 
                <table className="results" key={index}>
                    <tbody>
                        <tr>
                            <td>
                                <img alt="movie poster" src={url + props.movie.results[index].poster_path} />
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
                </>
            )
        }
        return (
            <>
            </>
        )
        
    } catch (e) {
        console.log(e)
    }
    }

export default SearchResultRow;
