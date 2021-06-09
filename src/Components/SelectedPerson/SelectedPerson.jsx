import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ScrollContainer from 'react-indiana-drag-scroll';
import { getPersonDetail } from '../../Features/repositoryAPI';
import { STATUS } from '../../Features/loadingAnim';
import './SelectedPerson.css';
import { actions } from '../../Features/movieSelected'
import { actions as activeViewActions } from '../../Features/activeView';

const SelectedPerson = () => {
    const url = sessionStorage.profileMedium;
    const status = useSelector(state => state.loadingAnim.status);
    const personId = useSelector(state => state.movieSelected.id);;
    const [personDetail, setPersonDetail] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [flixContent, setFlixContent] = useState('');
    const dispatch = useDispatch();

    const setID = (id) => {
        dispatch(actions.getMovieID(id));
        dispatch(activeViewActions.selectedMovie());
    }
    
    useEffect(() => {
        getPersonDetail(dispatch, personId, currPage).then((resp) => {
            setPersonDetail(JSON.parse(resp))
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            //pop
            let tempElements = personDetail.results.map((movie, index) => (
                fillList(movie, index)
            ));
            setFlixContent(tempElements);
        }
    }, [personDetail]);



    return (
        <ScrollContainer className="individual-person-component">
            <div className="person-info">
                <div className="person-poster">
                    <img src={personDetail.profile_path ? url + personDetail.profile_path : null} alt="" />
                </div>

                <div className="movie-info-container">
                    <div className="person-title-text">{personDetail.name}</div>
                    <div className="person-info-text">{personDetail.birthday}</div>
                    <div className="person-info-text">{personDetail.deathday ? personDetail.deathday : ''}</div>
                    <div className="person-info-text">{personDetail.place_of_birth}</div>
                    <div className="person-info-text">{personDetail.biography}</div>
                </div>
            </div>

            <div className='person-heading'>
                Movies
            </div>
            <ScrollContainer className='person-movie-row'>
                {flixContent}
            </ScrollContainer>
        </ScrollContainer>
    )

    function fillList(movie, index) {
        if (movie.poster_path != null) {
            return (
                <div key={index}  onClick={() => {
                    setID(movie.id);
                    // Call selectedMovie via ActiveView
                }}>
                    <img src={sessionStorage.posterSmall + movie.poster_path} alt="poster" />
                </div>
            )
        }
        return '';
    }
}

export default SelectedPerson;