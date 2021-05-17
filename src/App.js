import logo from './logo.png';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS as GENSTATUS } from './Features/genresListOf';
import { getGenre, getImgUrl } from "./Features/repositoryAPI";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ActiveView from './Components/ActiveView';

function App() {
  const status = useSelector(state => state.genresListOf.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === GENSTATUS.NORMAL) {
      getImgUrl();
      getGenre(dispatch);
    }
  }, [dispatch]);

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
