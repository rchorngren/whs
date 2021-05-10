import logo from './logo.svg';
import './App.css';
import CounterRedux from './Components/CounterRedux';

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
