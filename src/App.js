import logo from './logo.png';
import './App.css';
import CounterRedux from './Components/CounterRedux';
import { useEffect } from 'react';

function App() {

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
