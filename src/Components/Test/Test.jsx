import { useEffect, useState} from 'react';
import { createOrder } from '../../Features/repositoryFS';

const Test = () => {
    const [fsQueryDone, setFsQueryDone] = useState(false);
    const [content, setContent] = useState('Hello world!');
    let orderList = [603, 503736];

    useEffect(() => {   // Make sure it only run once
        createOrder(orderList, () => setFsQueryDone(true))
    }, []);

    useEffect(() => {
        if (fsQueryDone){
            setContent('Thank you for your order!');
        }
    }, [fsQueryDone]);

    return (
        <div>{content}</div>
    );
}

export default Test;