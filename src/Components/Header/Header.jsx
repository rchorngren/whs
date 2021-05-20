import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, ACTIVEVIEW } from '../../Features/activeView';
<<<<<<< HEAD
// import ProfileIcon from '../../Assets/Images/profileIcon.png';
import BasketCounter from '../BasketCounter/BasketCounter';
import ShoppingCart from '../../Assets/Images/shoppingCart.png';
=======
import ProfileIcon from '../../Assets/Images/profileIcon.png';
import SearchIcon from '../../Assets/Images/search.png';
>>>>>>> added searchView to active views. added search compononent to display searchbar and searchresult
import './Header.css';

const Header = () => {
    const [shoppingCartButtonIsClicked, setShoppingCartButtonIsClicked] = useState(false);
    const [menuButtonIsClicked, setMenuButtonIsClicked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const activeView = useSelector(state => state.activeView.activeView);

    useEffect(() => {
        if (activeView === ACTIVEVIEW.MENU) {
            setMenuOpen(true);
        } else {
            setMenuOpen(false);
        }
    }, [activeView]);

    const dispatch = useDispatch();

    function animationOnClick(dispatch, clickedButton) {
        setTimeout(() => {
            setShoppingCartButtonIsClicked(false);
        }, 100);
        setTimeout(() => {
            if (clickedButton === 'baskedClicked') {
                setMenuButtonIsClicked(false);
<<<<<<< HEAD
                dispatch(actions.checkout());
            } else {
=======
                if (userLoggedIn) {
                    dispatch(actions.profile());
                } else {
                    dispatch(actions.login());
                }
            } else if (clickedButton === 'menuClicked'){
>>>>>>> added searchView to active views. added search compononent to display searchbar and searchresult
                if (menuButtonIsClicked) {
                    setMenuButtonIsClicked(!menuButtonIsClicked);
                    dispatch(actions.empty());
                } else {
                    dispatch(actions.menu());
                }
            } else if (clickedButton === 'searchClicked'){
                dispatch(actions.search());
            }
        }, 250);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
    //searchfunction
    const [movie, setMovieData] = useState([]);
    const [searchTerm, SetSearchTerm] = useState([]);
    let multi = false
    let currPage = 1;
    let search = searchTerm;
    

      useEffect(() => {
        searchFlix(search, multi, currPage).then((r) => {
            if(search.length < 2) {
                // console.log('no data')
            } else {
                setMovieData(JSON.parse(r))
                console.log(movie)
            }  
        })
        
      }, [searchTerm])

>>>>>>> rebase from main
=======
    

>>>>>>> added searchView to active views. added search compononent to display searchbar and searchresult
    return (
        <>
        <header className="header">
            <div
                className="menuButton buttonGeneral"
                onClick={() => { setMenuButtonIsClicked(true); animationOnClick(dispatch, 'menuClicked') }}>
                <div className="menuContainer">
                    {menuOpen ? (
                        //when menu is open
                        <div>
                            <div className="menuRowOpenA" />
                            <div className="menuRowOpenB" />
                        </div>

                    ) : (
                        //when menu is closed
                        <div>
                            <div className="menuRow" />
                            <div className="menuRow" />
                            <div className="menuRow" />
                        </div>
                    )}
                </div>

            </div>

<<<<<<< HEAD
            <div style={{marginRight: '-10px'}}>
                <h2>WHS</h2>
            </div>

=======
            <h2>WHS</h2>
            
<<<<<<< HEAD
            <SearchBar searchTerm={searchTerm} SetSearchTerm={SetSearchTerm}/>
>>>>>>> rebase from main
=======
           <div className ="searchButton" onClick={() => {
                   console.log('clicked')
                   //TODO set active view to searchview
                   animationOnClick(dispatch, 'searchClicked')
               }}>
               <img src={SearchIcon}  />
               <p>Search</p>
           </div>
>>>>>>> added searchView to active views. added search compononent to display searchbar and searchresult

            <div
                className="shoppingcartButton buttonGeneral"
                onClick={() => { setShoppingCartButtonIsClicked(true); animationOnClick(dispatch, 'baskedClicked') }}>
                <img
                    className={shoppingCartButtonIsClicked ? "buttonImageClicked" : "buttonImage"}
                    src={ShoppingCart} alt="" />
            </div>
        </header>
        </>
    )
}

export default Header;