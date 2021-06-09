import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ScrollContainer from 'react-indiana-drag-scroll';
import { getPersonDetail } from '../../Features/repositoryAPI';
import './SelectedPerson.css';

const SelectedPerson = () => {
    const url = sessionStorage.profileMedium;
    const personId = useSelector(state => state.movieSelected.id);;
    const [personDetail, setPersonDetail] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        getPersonDetail(dispatch, personId, currPage).then((resp) => {
            setPersonDetail(JSON.parse(resp))
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <div>
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

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>

                <div className="person-price-text">
                    Price <br />
                    $4.99
                </div>
            </div>
            <ScrollContainer className="individual-person-component">
            </ScrollContainer>
        </div>
    )
}

export default SelectedPerson;