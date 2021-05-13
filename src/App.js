import logo from './logo.svg';
import './App.css';
import CounterRedux from './Components/CounterRedux';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <CounterRedux />
        <CounterRedux />
        <CounterRedux />
      </main>
      <Footer />
    </div>
  );
}

export default App;
