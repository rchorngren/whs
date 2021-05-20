import logo from '../logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './loadingAnim.css';

const status = useSelector(state => state.genresListOf.status);
const dispatch = useDispatch();

useEffect(() => {
  if (status === GENSTATUS.NORMAL) {
    getImgUrl();
    getGenre(dispatch);

  }
}, [dispatch]);

const LoadingAnim = () => {
    return(
        <div className='loading'>Loading</div>
    );
}

export default LoadingAnim;