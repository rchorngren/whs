import logo from './logo.png';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS as GENSTATUS } from './Features/genresListOf';
import { getGenre } from "./Features/repositoryAPI";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ActiveView from './Components/ActiveView';


// git checkout -b [branch name]
// git add .  läga till allt redigerat
// git commit -m "commit namn"
// git push

function App() {
  const status = useSelector(state => state.genresListOf.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === GENSTATUS.NORMAL) {
      getGenre(dispatch);
    }
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
      </header>
      <main>
        <ActiveView />
      </main>
      <Footer />
    </div>
  );
}

export default App;
