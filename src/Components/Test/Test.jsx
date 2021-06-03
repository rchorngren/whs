import { useEffect} from 'react';
import { getOrders } from '../../Features/repositoryFS';

const Test = () => {
  
    useEffect(() => {   
        getOrders()
    }, []);

    return (
        <div>Hello World</div>
    );
}

export default Test;