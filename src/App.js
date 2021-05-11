import logo from './logo.png';
import './App.css';
import CounterRedux from './Components/CounterRedux';
import { getGenreList } from "./Features/repositoryAPI";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    let myArray = '';
    getGenreList(27, 1).then((resp) => {
      myArray = JSON.parse(resp);
      console.log('x: ' + myArray.results[0].title);
      console.log('y: ' + myArray.results.length);
    });
  }, [])



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
