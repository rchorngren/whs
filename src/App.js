import logo from './logo.svg';
import './App.css';
// import CounterRedux from './Components/CounterRedux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ActiveView from './Components/ActiveView';


function App() {

  

  return (
    <div className="App">
      <Header />
      <main>
        <ActiveView />
      </main>
      <Footer />
    </div>
  );
}

export default App;
