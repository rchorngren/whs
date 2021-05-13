import logo from './logo.png';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS as GENSTATUS } from './Features/genresListOf';
import { getGenre } from "./Features/repositoryAPI";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ActiveView from './Components/ActiveView';

import './Components/GenreSidebar/sidebarUi.css';
import CounterRedux from './Components/CounterRedux';
import GenreMeny from './Components/GenreSidebar/GenreMenu';

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

      </header>
      <main>
        <ActiveView />
      </main>
      <Footer />

      <GenreMeny/>
    </div>
  );
}

export default App;
