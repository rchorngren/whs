import logo from '../../logo.png';
import React from 'react'
import './SearchResultRow.css'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch } from 'react-redux'
import { actions } from '../../Features/movieSelected'
import { actions as activeViewActions } from '../../Features/activeView';

const SearchResultRow = (props) => {
    const url = 'https://image.tmdb.org/t/p/w200';
    const dispatch = useDispatch()
    
    const setID = (id) => {
        dispatch(actions.getMovieID(id))
        dispatch(activeViewActions.selectedMovie());
    }
    
    try {
        if (props.movie.results) {
            return (
                <ScrollContainer className="search-result-component">
                    {props.movie.total_pages === 0 ?
                        <table className="results">
                            <tbody>
                                <tr>
                                    <td>
                                        <img alt="movie poster" src={logo} />
                                    </td>
                                    <td>
                                        <p>No movie found!</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table> :
                        props.movie.results.map((movie, index) =>
                            <table className="results" key={index}>
                                <tbody>
                                    <tr onClick={() => {
                                        setID(props.movie.results[index].id)
                                    }}>
                                        <td>
                                            <img alt="movie poster"
                                                src={props.movie.results[index].poster_path ? url + props.movie.results[index].poster_path : logo}
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
                </ScrollContainer>
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
