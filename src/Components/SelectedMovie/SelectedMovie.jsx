import './SelectedMovie.css';

const SelectedMovie = () => {

    return (
        <div className="individual-movie-component">

            <div className="movie-info">

                <div style={{ background: 'blue' }} className="movie-poster"></div>
                <div className="movie-info-container">
                    <div className="movie-title-text">Movie title goes here</div>
                    <div className="movie-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                    <div className="movie-actor-text">Staring: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                </div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                <div className="user-rating-container">
                    User rating <br />
                    <div className="user-rating-score-text">4.5</div>
                </div>
                <div className="movie-price-text">
                    Price <br />
                    $4.99
                </div>
            </div>

            <div>
                <div className="buy-button">Buy</div>
            </div>

            <div className="user-review-container">
                <div className="user-review-header">User reviews</div>
                
                {/* user-review is generated through mapping of any reviews left by other users */}

                <div className="user-review">
                    <div className="user-review-text">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </div>
                </div>

                <div className="user-review">
                    <div className="user-review-text">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </div>
                </div>

                <div className="user-review">
                    <div className="user-review-text">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </div>
                </div>

            </div>


        </div>
    )
}

export default SelectedMovie;