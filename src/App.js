import logo from './logo.png';
import './App.css';
import CounterRedux from './Components/CounterRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from './Features/genresListOf';
import { getGenre } from "./Features/repositoryAPI";

function App() {
  const status = useSelector(state => state.genresListOf.status);
  const list = JSON.parse(useSelector(state => state.genresListOf.list));
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.NORMAL) {
      getGenre(dispatch);
    }
  }, [dispatch])
  if (status === STATUS.SUCCESS) {
    console.log('list: ' + list.genres[0].name)
  }

  return (
    <div className="App">
      <header className="App-header">
        WHS
      </header>
      <main>
        <CounterRedux />
        <CounterRedux />
        <CounterRedux />
      </main>
    </div>
  );
}

export default App;
