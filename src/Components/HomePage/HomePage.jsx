import { getSortedFlix, getUpcommingFlix } from "../../Features/repositoryAPI";
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './homePage.css';

// Under construction!

const HomePage = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [content, setContent] = useState('');
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
        console.log(status);
        if (status === STATUS.FINISHED) {
            console.log('popular ' + popularFlix.results[0].title);
            console.log('recommend ' + recommendedFlix);
            console.log('newFlix ' + newFlix.results[0].title);
            console.log('upcommingFlix ' + upcommingFlix.results[0].title);
        }
    }, [popularFlix, recommendedFlix, newFlix, upcommingFlix]);

    return (
        <div>Hej {content}</div>
    );
}

export default HomePage;