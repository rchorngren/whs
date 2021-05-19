import React, { useEffect } from 'react'

const SearchResultRow = (props) => {
    const url = 'https://image.tmdb.org/t/p/w200';
    let index = 0;
    useEffect(() => {
       try {
           if (props.movie.results) {
               console.log(props.movie.results)
           } else {
               console.log('no data in movie')
           }
       } catch (e) {
           console.log(e)
       }
    })

    try {
        if (props.movie.results) {
            return (
                <table style={{
                    background: '#000',
                    color: '#fff',
                    width: '100%',
                    display: 'block'
                }}>
                    <tbody>
                        <tr>
                            <td>
                                <img alt="movie poster" src={url + props.movie.results[index].poster_path} />
                            </td>
                            <td style={{textAlign: 'left'}}>
                                <h3>{props.movie.results[index].title}</h3>
                              <p>{props.movie.results[index].overview}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        } else {
            return (
                <>
                </>
            )
        }
    } catch (e) {
        console.log(e)
    }
    }

export default SearchResultRow;
