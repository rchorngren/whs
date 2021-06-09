import logo from '../../logo.png';
import React from 'react'
import './SearchResultRow.css'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDispatch } from 'react-redux'
import { actions } from '../../Features/movieSelected'
import { actions as activeViewActions } from '../../Features/activeView';

const SearchResultRow = (props) => {
    const url = sessionStorage.posterMedium;
    const dispatch = useDispatch()
    
    const setID = (id, movie) => {
        dispatch(actions.getMovieID(id))
        if (movie){
            dispatch(activeViewActions.selectedMovie());
        }
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
                            <table className="results" key={index} width="100%">
                                <tbody>
                                    <tr onClick={() => {
                                        // kontrollera om det är en skådis
                                        console.log(props.movie.results[index].gender);
                                        if (props.movie.results[index].gender === undefined){
                                            setID(props.movie.results[index].id, true);
                                        } else {
                                            setID(props.movie.results[index].id, false);
                                        }
                                    }}>
                                        <td align="left">
                                            <img alt="movie poster"
                                                src={props.movie.results[index].poster_path ? url + props.movie.results[index].poster_path : logo}
                                            />
                                        </td>
                                        <td align="left">
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
