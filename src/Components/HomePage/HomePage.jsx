import { getSortedFlix, getUpcommingFlix } from "../../Features/repositoryAPI";
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import './homePage.css';

let yDown = null;                               // Check swipe
let yUp = null;                               // Check swipe

// Under construction!
// Giving up on own DragScroll solution. Testing something else

const HomePage = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [popContent, setPopContent] = useState('');
    const [popularFlix, setPopularFlix] = useState([]);
    const [popElements, setPopElements] = useState([]);
    const [recommendedFlix, setRecommendedFlix] = useState([]);
    const [newFlix, setNewFlix] = useState([]);
    const [upcommingFlix, setUpcommingFlix] = useState([]);
    const dispatch = useDispatch();
    const myRef = useRef(null);

    useEffect(() => {
        getUpcommingFlix(dispatch, 1).then((resp) => { setUpcommingFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'popular', 1).then((resp) => { setPopularFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'recommended', 1).then((resp) => { setRecommendedFlix(JSON.parse(resp)) });
        getSortedFlix(dispatch, 'new', 1).then((resp) => { setNewFlix(JSON.parse(resp)) });
    }, [dispatch]);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            const tempElements = popularFlix.results.map((movie, index) => (
                <div key={index}>
                    <img src={sessionStorage.posterSmall + movie.poster_path} alt="poster" />
                </div>
            ));
            setPopContent(tempElements);
        }
    }, [popularFlix, recommendedFlix, newFlix, upcommingFlix]);

    return (
        <div className='homepage'>
            <div className='homepage heading'>
                Popular
            </div>
            <div className='homepage first-row' 
            onMouseDown={(e) => { yDown = e.screenY }} 
            onMouseUp={(e) => { 
                alert('yDown' + yDown);
                alert('yUp' + yUp);
             }}
            onMouseMove={(e) => {
                yUp = yDown - e.screenY;
                // scrollBy(0, yUp);
                // if ((yDown - e.touches[0].clientY) > 5) {
                //     setTimeout(() => {
                //         yDown = e.touches[0].clientY;
                //     }, 500);
                // } else if ((yDown - e.touches[0].clientY) < -5) {
                //     setTimeout(() => {
                //         yDown = e.touches[0].clientY;
                //     }, 500);
                // }
            }}>
                {popContent}
            </div>
        </div>
    );
}

export default HomePage;