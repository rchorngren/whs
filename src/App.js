import logo from './logo.png';
import './App.css';
import CounterRedux from './Components/CounterRedux';
import { getGenre } from "./Features/repository";

function App() {
  let test = getGenre();
  setTimeout(() => {
    console.log(test);
  }, 3000);


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
