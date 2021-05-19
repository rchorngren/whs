import React, { useEffect } from 'react'

const SearchResultRow = (props) => {
    const url = 'https://image.tmdb.org/t/p/w200';
    let index = 0;
    useEffect(() => {
    //    console.log(props) 
    //    console.log(props.movie) 
    //    console.log(props.movie.results) 
    //    console.log(props.movie.results[0]) 
    })
        return (
            <>
            {props.movie.reults.map(movie, index => {
                 <table style={{
                    background: '#000',
                    color: '#fff',
                    width: '100%',
                    display: 'block'
                }}>
                    <tbody>
                        <tr>
                            <td>
                                <img alt="movie poster" src={url + movie.results[index].poster_path} />
                            </td>
                            <td style={{textAlign: 'left'}}>
                                <h3>{movie.results[index].title}</h3>
                              <p>{movie.results[index].overview}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            })} 
            </>
        )
    }

export default SearchResultRow;
