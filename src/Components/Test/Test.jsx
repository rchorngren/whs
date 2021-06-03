import { useEffect, useState } from 'react';
import * as FirestoreService from '../../Features/repositoryFS';
import './test.css';

const Test = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        FirestoreService.createOrder([603, 605])
        .then(() => {
            console.log('finnished?');
        })
        .catch(reason => setContent('create-list-error' +  reason));    
    }, []);

    return (
        <div className='test'>{content}</div>
    );
}

export default Test;