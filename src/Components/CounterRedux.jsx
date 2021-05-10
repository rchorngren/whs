import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/counter';

const CounterRedux = () => {

    const value = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const increase = () => dispatch(actions.increase());
    const decrease = () => dispatch(actions.decrease());


    return (
        <div> 
            Value: {value} - Redux, state in store <br />
            <button onClick={increase}> + </button>
            <button onClick={decrease}> - </button>
        </div>
    )
}

export default CounterRedux;