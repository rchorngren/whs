import { getSortedFlix, getUpcommingFlix } from "../../Features/repositoryAPI";
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'
import './homePage.css';

const HomePage = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [popContent, setPopContent] = useState('');
    const [recContent, setRecContent] = useState('');
    const [newContent, setNewContent] = useState('');
    const [upContent, setUpContent] = useState('');
    const [popularFlix, setPopularFlix] = useState([]);
    const [recommendedFlix, setRecommendedFlix] = useState([]);
    const [newFlix, setNewFlix] = useState([]);
    const [upcommingFlix, setUpcommingFlix] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getUpcommingFlix(dispatch, 1).then((resp) => { setUpcommingFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'popular', 1).then((resp) => { setPopularFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'recommended', 1).then((resp) => { setRecommendedFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'new', 1).then((resp) => { setNewFlix(JSON.parse(resp)) });
    }, [dispatch]);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            //pop
            let tempElements = popularFlix.results.map((movie, index) => (
                fillList(movie, index)
            ));
            setPopContent(tempElements);

            //rec
            tempElements = recommendedFlix.results.map((movie, index) => (
                fillList(movie, index)
            ));
            setRecContent(tempElements);

            //new
            tempElements = newFlix.results.map((movie, index) => (
                fillList(movie, index)
            ));
            setNewContent(tempElements);

            //up
            tempElements = upcommingFlix.results.map((movie, index) => (
                fillList(movie, index)
            ));
            setUpContent(tempElements);
        }  // eslint-disable-next-line
    }, [popularFlix, recommendedFlix, newFlix, upcommingFlix]);

    return (
        <div className='homepage-container'>
            <div className='homepage'>
                <div className='homepage heading first'>
                    Popular
            </div>
                <ScrollContainer className='homepage movie-row second'>
                    {popContent}
                </ScrollContainer>
                <div className='homepage heading third'>
                    Top Recommendations
            </div>
                <ScrollContainer className='homepage movie-row forth'>
                    {recContent}
                </ScrollContainer>
                <div className='homepage heading fifth'>
                    New
            </div>
                <ScrollContainer className='homepage movie-row sixth'>
                    {newContent}
                </ScrollContainer>
                <div className='homepage heading seventh'>
                    Comming
            </div>
                <ScrollContainer className='homepage movie-row eightth'>
                    {upContent}
                </ScrollContainer>
            </div>
        </div>
    );

    function fillList(movie, index) {
        if (movie.poster_path != null) {
            return (
                <div key={index}>
                    <img src={sessionStorage.posterSmall + movie.poster_path} alt="poster" />
                </div>
            )
        }
        return '';
    }
}

export default HomePage;