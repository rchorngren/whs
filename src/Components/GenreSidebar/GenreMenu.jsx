import React from 'react-redux';
//import genre array

const GenreMenu = () => {

   let placeholder = ['Action','Schi-fi','Thriller']

   const genreList = placeholder.map((item) => (
        <div className='genreItems'>{item}</div>
   ))

    return(
        <div className='genreSidebar'>
            <div className='genreItemsContainer'>
                {genreList}
            </div>
             
        </div>
    )
}

export default GenreMenu;