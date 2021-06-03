import { useEffect, useState } from 'react';
import * as FirestoreService from '../../Features/repositoryFS';
import './test.css';

const Test = () => {
    const [content, setContent] = useState('');
    const userCred = JSON.parse(localStorage.currentUser);
    console.log('user ' + userCred.user);
    
    useEffect(() => {
        console.log('uid ' + userCred.user.uid);
        console.log('name ' + userCred.user.email);
        let orderList = [(1, 603), (1, 605)];
        
        let tempElements = orderList.map((movie, index) => (
            console.log(movie)
        ));
        // FirestoreService.createOrder(orderList)
        // .then(docRef => {
        //     setContent(docRef.id);
        // })
        // .catch(reason => setContent('create-list-error' +  reason));    
    }, []);
    
    return(
        <div className='test'>{content}</div>
    );
}

export default Test;