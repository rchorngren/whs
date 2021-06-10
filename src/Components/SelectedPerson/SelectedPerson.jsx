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
    const [flixContent, setFlixContent] = useState([]);
    const [sadDay, setSadDay] = useState('');
    const [pagerRight, setpagerRight] = useState('');
    const [movieElements, setMovieElements] = useState([]);
    const dispatch = useDispatch();

    const setID = (id) => {
        dispatch(actions.getMovieID(id));
        dispatch(activeViewActions.selectedMovie());
    }

    console.log('reloading');
    useEffect(() => {
        getPersonDetail(dispatch, personId, currPage).then((resp) => {
            setPersonDetail(JSON.parse(resp))
        });
        setFlixContent('');
    }, [currPage]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            let tempElements = movieElements;
            for (let i=0; i < personDetail.results.length; i++){
                const index = (personDetail.results.length * (currPage - 1)) + i;
                tempElements.push(fillList(personDetail.results[i], index));
            }
            console.log(tempElements);
            if (personDetail.deathday !== null){
                setSadDay(<div className="person-info-text">&dagger; {personDetail.deathday}</div>);
            } else {
                setSadDay('');
            }
            
            setFlixContent(tempElements);
            setMovieElements(tempElements);
            if (personDetail.page < personDetail.total_pages && personDetail.total_pages > 1){
                setpagerRight(<div onClick={() => setCurrPage(currPage+1)}>&#x025B8;</div>);
            } else {
                setpagerRight('');
            }
        }
    }, [personDetail]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="individual-person-component">
            <div className="person-info">
                <div className="person-poster">
                    <img src={personDetail.profile_path ? url + personDetail.profile_path : null} alt="" />
                </div>

                <div className="person-info-container">
                    <div className="person-title-text">{personDetail.name}</div>
                    <div className="person-info-text">&#x02736; {personDetail.birthday}</div>
                    <div className="person-info-text">{personDetail.place_of_birth}</div>
                    {sadDay}
                    <div className="person-info-text">(Age: {personDetail.deathday ? getAge(personDetail.birthday, personDetail.deathday) : getAge(personDetail.birthday, '')} )</div>
                </div>
            </div>
            <ScrollContainer className="person-bio-container">
                <div className="person-bio-text">Biography:</div>
                <div className="person-bio-text">{personDetail.biography}</div>
            </ScrollContainer>

            <div className='person-heading'>
                Movies
            </div>
            <ScrollContainer className='person-movie-row'>
                {flixContent}
                {pagerRight}
            </ScrollContainer>
        </div>
    )

    function fillList(movie, index) {
        if (movie.poster_path != null) {
            return (
                <div key={index} onClick={() => {
                    setID(movie.id);
                    // Call selectedMovie via ActiveView
                }}>
                    <img src={sessionStorage.posterSmall + movie.poster_path} alt="poster" />
                </div>
            )
        }
        return '';
    }

    function getAge(birth, death) {
        if (death === ''){death = Date()}
        let ageMS = Date.parse(death) - Date.parse(birth);
        let age = new Date();
        age.setTime(ageMS);
        let ageYear = age.getFullYear() - 1970;

        return ageYear;
    }
}

export default SelectedPerson;