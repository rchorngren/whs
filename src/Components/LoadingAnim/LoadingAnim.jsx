import logo from '../../logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { STATUS } from '../../Features/loadingAnim';
import './loadingAnim.css';
import { useEffect, useState } from 'react';
import { actions as loadAnimAction } from '../../Features/loadingAnim';

const LoadingAnim = () => {
  const status = useSelector(state => state.loadingAnim.status);
  const [onOff, setOnOff] = useState(false);
  const [showAnim, setShowAnim] = useState('not-loading');
  const dispatch = useDispatch();

  useEffect(() => {
    if (onOff && status === STATUS.LOADING) {
      setShowAnim('loading');
    } else {
      setShowAnim('not-loading');
    } // eslint-disable-next-line
  }, [onOff]);

  useEffect(() => {
    if (!onOff && status === STATUS.LOADING) {
      setTimeout(() => {
        setOnOff(true);
      }, 1000)
    }

    if (onOff && (status === STATUS.FINISHED || status === STATUS.WAITING)) {
      setTimeout(() => {
        setOnOff(false);
      }, 2000)
    } // eslint-disable-next-line

    if (status === STATUS.FINISHED) {
      setTimeout(() => {
        if (status === STATUS.FINISHED) {
          //change to waiting
          dispatch(loadAnimAction.wait());
        }
      }, 1000)
    } // eslint-disable-next-line
  }, [status]);


  return (
    <div className={showAnim}>
      <img src={logo} alt="" />
    </div>
  );
}

export default LoadingAnim;