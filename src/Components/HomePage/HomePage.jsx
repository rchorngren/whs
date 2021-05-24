import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Features/loadingAnim';
import './homePage.css';
import { useEffect, useState } from 'react';
import { getSortedFlix, getUpcommingFlix } from "../../Features/repositoryAPI";

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
        if (status === STATUS.FINISHED) {
            console.log(popularFlix);
            console.log(recommendedFlix);
            console.log(newFlix);
            console.log(upcommingFlix);
            console.log(status);
            setContent('Fully Loaded - ');
        } // eslint-disable-next-line
    }, [status]);

    // useEffect(() => {
    //     console.log(status);
    //     if (status === STATUS.FINISHED) {
    //         console.log('popular ' + popularFlix.results[0].title);
    //     }
    // }, [popularFlix]);

    // useEffect(() => {
    //     if (status === STATUS.FINISHED) {
    //         console.log('recommend ' + recommendedFlix);
    //     }
    // }, [recommendedFlix]);

    // useEffect(() => {
    //     if (status === STATUS.FINISHED) {
    //         console.log('hej ' + newFlix.results[0].title);
    //     }
    // }, [newFlix]);

    // useEffect(() => {
    //     if (status === STATUS.FINISHED) {
    //         console.log('hej ' + upcommingFlix.results[0].title);
    //     }
    // }, [upcommingFlix]);



    return (
        <div>Hej {content}</div>
    );
}

export default HomePage;