import React from 'react'

const SearchResultRow = (props) => {
    return (
        <>
            {props.movie.map((movie, index) =>
                   <table key={movie.imdbID} style={{
                       background: '#000',
                       color: '#fff',
                       width: '100%',
                       display: 'block'
                   }}>
                   <tbody>
                       <tr>
                           <td>
                               <img alt="movie poster" width="120" src={movie.Poster} style={{
                                   paddingRight: '16'
                               }}/>
                           </td>
                           <td style={{
                               textAlign: "left"
                           }}>
                               <h3>{movie.Title}</h3>
                                <p>{movie.Plot}</p>
                           </td>
                       </tr>
                   </tbody>
               </table>
               )}
        </>
    )
}

export default SearchResultRow;
