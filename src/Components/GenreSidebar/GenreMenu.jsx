
import { useEffect, useState } from 'react';
import React, { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actions } from '../../Features/genreSelected';
import { STATUS } from '../../Features/genresListOf';
import { getGenre } from '../../Features/repositoryAPI';
import { actions as activeViewActions } from '../../Features/activeView';
import { actions as sideMenuActions } from '../../Features/sideMenu';


const GenreMenu = () => {
    
    const [buttonClicked, setButtonClicked] = useState(false);
    const status = useSelector(state => state.genresListOf.status);
    const genreList = JSON.parse(useSelector(state => state.genresListOf.list));
    const dispatch = useDispatch();

    useEffect(() => {
       getGenre(dispatch); // eslint-disable-next-line
    }, [])

    function animationOnClick() {
        setTimeout(() => {
            setButtonClicked(false);
        }, 150);
        setTimeout(() => {
            dispatch(sideMenuActions.menuClosed());
            dispatch(activeViewActions.chosenGenre());
        }, 250);
    }


    let genreListMap = [];
    if(status === STATUS.SUCCESS) {
        genreListMap = genreList.genres.map((genre) => (
            <div className='genreItems'
                key={genre.id} onClick={() => {
                    dispatch(actions.genreClicked(genre.id)); 
                    
                    animationOnClick()
                    setButtonClicked(true)
                }}>{genre.name}</div>       
        ));
    }    
    
    return (
        <div  className='genreSidebar'>
            <h3 id='genresText'>Genres</h3>
                <div className='sidebarScroll'>
                    <div className='genreItemsContainer'>
                        {genreListMap}
                    </div>    
                </div>           
        </div>  
    )
}

export default GenreMenu;