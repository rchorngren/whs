import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS as GENSTATUS } from './Features/genresListOf';
import { getGenre, getImgUrl } from "./Features/repositoryAPI";
import LoadingAnim from './Components/LoadingAnim';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ActiveView from './Components/ActiveView';
import db from './firebase.config'; // eslint-disable-line

import './Components/GenreSidebar/sidebarUi.css';

// git checkout -b [branch name]
// git add .  läga till allt redigerat
// git commit -m "commit namn"
// git push

function App() {
  const status = useSelector(state => state.genresListOf.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === GENSTATUS.NORMAL) {
      getImgUrl();
      getGenre(dispatch);

    }
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <div className="left-side"></div>
      <div className="center">
        <Header />
        <main>
          <LoadingAnim />
          <ActiveView />
        </main>
        <Footer />
      </div>
      <div className="right-side"></div>
    </div>
  );
}

export default App;
