import React from 'react-redux';

const GenreMenu = () => {

   let placeholder = ['Action','Schi-fi','Thriller']

   const test = (item) => {
    console.log(item)
    }

   //creates a div for each item in array
   const genreSidebarList = placeholder.map((item) => (
        <div className='genreItems' onClick={() => test(item)}>{item}</div>
   ))

    return(
        <div className='genreSidebar'>
            <h3 id='genresText'>Genres</h3>
            <div className='genreItemsContainer'>
                {genreSidebarList}
            </div>

        </div>
    )
}

export default GenreMenu;