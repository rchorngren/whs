/**************************************************************************************/
/*                             repositoryAPI.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from movie APIs.             */
/**************************************************************************************/
import { actions as genresListOfAction } from './genresListOf';
import { actions as loadAnimAction } from './loadingAnim';

const url1 = 'https://api.themoviedb.org/3/';
const apiKey1Lang = 'api_key=4b112e5196b1623d24a8585c80c32de0&language=en-U';

/**************************************************************************************/
/*                             getImgUrl() - Async                                    */
/*                                                                                    */
/*  Sets Session variables for Url to Poster and background images:                   */
/*  backgroundSmall: Small sized background images                                    */
/*  backgroundMedium: Medium sized background images                                  */
/*  backgroundLarge: Large sized background images                                    */
/*                                                                                    */
/*  posterSmall: Small sized posters                                                  */
/*  posterMedium: Medium sized posters                                                */
/*  posterLarge: large sized posters                                                  */
/*                                                                                    */
/*  Usage:                                                                            */
/*     let myPosterUrl = sessionStorage.posterLarge + posterName;                     */
/*                                                                                    */
/**************************************************************************************/
export async function getImgUrl() {
  try {
    let resp = await fetch(url1 + 'configuration?' + apiKey1Lang);
    let data = await resp.json();
    sessionStorage.setItem('backgroundSmall', data.images.secure_base_url + data.images.backdrop_sizes[0]);
    sessionStorage.setItem('backgroundMedium', data.images.secure_base_url + data.images.backdrop_sizes[1]);
    sessionStorage.setItem('backgroundLarge', data.images.secure_base_url + data.images.backdrop_sizes[2]);
    sessionStorage.setItem('posterSmall', data.images.secure_base_url + data.images.poster_sizes[0]);
    sessionStorage.setItem('posterMedium', data.images.secure_base_url + data.images.poster_sizes[3]);
    sessionStorage.setItem('posterLarge', data.images.secure_base_url + data.images.poster_sizes[5]);
  }
  catch (error) {
    console.log(error);
  }
}

/**************************************************************************************/
/*                             getGenre() - Async                                     */
/*                                                                                    */
/*  Returns a list of genre from themoviedb.org as JSON - called at start of app.     */
/*  JSON format: {"genres": [{ "id": Int, "name": String}]}                           */
/*                                                                                    */
/*                                                                                    */
/*  Usage: See Global states (variables)                                              */
/*                                                                                    */
/**************************************************************************************/
export async function getGenre(dispatch) {
  dispatch(genresListOfAction.isFetching());
  try {
    let resp = await fetch(url1 + 'genre/movie/list?' + apiKey1Lang);
    let data = await resp.json();
    dispatch(genresListOfAction.success(JSON.stringify(data)));
  }
  catch (error) {
    dispatch(genresListOfAction.failure());
    console.log(error);
  }
}

/**************************************************************************************/
/*                          getGenreMovieList() - Async                               */
/*                                                                                    */
/*  Returns a list of movies (20/page) matching a genre from themoviedb.org as JSON   */
/*  Parameters: (dispatch, search String, multi Bool, page Int)                       */
/*         search String: the string to search fo                                      */
/*         page: the number of the page                                               */
/*                                                                                    */
/*  JSON format: {dispatch, "page": Int, "total_pages": Int, "total_results": Int,    */
/*                  "results": [                                                      */
/*                      "id": Int,                                                    */
/*                      "title": String,                                              */
/*                      "original_title": String,                                     */
/*                      "original_language": String,                                  */
/*                      "overview": String,                                           */
/*                      "poster_path": String,                                        */
/*                      "release_date": Date,                                         */
/*                      "popularity": Int,                                            */
/*                      "vote_average": Float,                                        */
/*                      "vote_count": Int,                                            */
/*                      "video": Bool,                                                */
/*                      "adult": Bool,                                                */
/*                      "backdrop_path": String,                                      */
/*                      "genre_ids": [Int, Int, Int]                                  */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage: 
import { getGenreMovieList } from "../../Features/repositoryAPI";    
import { useDispatch, useSelector } from 'react-redux';                            
import { STATUS } from '../../Features/loadingAnim';                               

const status = useSelector(state => state.loadingAnim.status);
const [currPage, setCurrPage] = useState(1);                                                                 
const [genreMovieList, setGenreMovieList] = useState([]);
const [content, setContent] = useState('');
const dispatch = useDispatch();
let genreId = 20;

useEffect(() => {                                                                  
  getGenreMovieList(dispatch, genreId, currPage).then((resp) => { setGenreMovieList(JSON.parse(resp)) });                                         
}, []);

useEffect(() => {
  if (status === STATUS.FINISHED) {
    setContent(genreMovieList.results[0].title);
  } // eslint-disable-next-line
}, [genreMovieList]);

***************************************************************************************/
export async function getGenreMovieList(dispatch, genreId, page) {
  let options = '&with_genres=' + genreId + '&sort_by=popularity.desc&page=' + page;
  dispatch(loadAnimAction.increase());

  try {
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    dispatch(loadAnimAction.decrease());
    dispatch(loadAnimAction.wait());
    return JSON.stringify(data);
  }
  catch (error) {
    console.log(error);
    dispatch(loadAnimAction.fail());
    return false;
  }
}

/**************************************************************************************/
/*                            getSortedFlix() - Async                                 */
/*                                                                                    */
/*  Returns a list of movies (20/page) matching a searchcriteria from db as JSON      */
/*  Parameters: (dispatch, search String, multi Bool, page Int)                       */
/*         search: 'popularity' = get most popular movies                             */
/*                 'recommended' = get movies with highest vote                       */
/*                 'new' = get newest movies                                          */
/*         page: the number of the page                                               */
/*                                                                                    */
/*  JSON format: {"page": Int, "total_pages": Int, "total_results": Int,              */
/*                  "results": [                                                      */
/*                      "id": Int,                                                    */
/*                      "title": String,                                              */
/*                      "original_title": String,                                     */
/*                      "original_language": String,                                  */
/*                      "overview": String,                                           */
/*                      "poster_path": String,                                        */
/*                      "release_date": Date,                                         */
/*                      "popularity": Int,                                            */
/*                      "vote_average": Float,                                        */
/*                      "vote_count": Int,                                            */
/*                      "video": Bool,                                                */
/*                      "adult": Bool,                                                */
/*                      "backdrop_path": String,                                      */
/*                      "genre_ids": [Int, Int, Int]                                  */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage:                                                                            

import { getSortedFlix } from "../../Features/repositoryAPI";    
import { useDispatch, useSelector } from 'react-redux';                            
import { STATUS } from '../../Features/loadingAnim';                               

const status = useSelector(state => state.loadingAnim.status);
const [currPage, setCurrPage] = useState(1);                                                                 
const [sortedFlix, setSortedFlix] = useState([]);
const [content, setContent] = useState('');
const dispatch = useDispatch();

useEffect(() => {                                                                  
  getSortedFlix(dispatch, currPage).then((resp) => { setSortedFlix(JSON.parse(resp)) });                                         
}, []);

useEffect(() => {
  if (status === STATUS.FINISHED) {
    setContent(sortedFlix.results[0].title);
  } // eslint-disable-next-line
}, [sortedFlix]);

***************************************************************************************/
export async function getSortedFlix(dispatch, search, page) {
  let options = '';
  dispatch(loadAnimAction.increase());

  if (search.toLowerCase() === 'recommended') {
    options = '&sort_by=vote_average.desc&page=' + page;
  } else if (search.toLowerCase() === 'new') {
    options = '&sort_by=release_date.desc&page=' + page;
  } else {
    options = '&sort_by=popularity.desc&page=' + page;
  }
  try {
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    dispatch(loadAnimAction.decrease());
    dispatch(loadAnimAction.wait());
    return JSON.stringify(data);
  }
  catch (error) {
    dispatch(loadAnimAction.fail());
    console.log(error);
    return false;
  }
}

/**************************************************************************************/
/*                          getUpcommingFlix() - Async                                */
/*                                                                                    */
/*  Returns a list of movies (20/page) to be released next month from db as JSON      */
/*  Parameters: (dispatch, page Int)                                                  */
/*         page: the number of the page                                               */
/*                                                                                    */
/*  JSON format: {"dates": {maximum: Date, minimum: Date}, "page": Int,               */
/*                  "results": [                                                      */
/*                      "id": Int,                                                    */
/*                      "title": String,                                              */
/*                      "original_title": String,                                     */
/*                      "original_language": String,                                  */
/*                      "overview": String,                                           */
/*                      "poster_path": String,                                        */
/*                      "release_date": Date,                                         */
/*                      "popularity": Int,                                            */
/*                      "vote_average": Float,                                        */
/*                      "vote_count": Int,                                            */
/*                      "video": Bool,                                                */
/*                      "adult": Bool,                                                */
/*                      "backdrop_path": String,                                      */
/*                      "genre_ids": [Int, Int, Int]                                  */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage:

import { getUpcommingFlix } from "../../Features/repositoryAPI";    
import { useDispatch, useSelector } from 'react-redux';                            
import { STATUS } from '../../Features/loadingAnim';                               

const status = useSelector(state => state.loadingAnim.status);
const [currPage, setCurrPage] = useState(1);                                                                 
const [upcommingFlix, setUpcommingFlix] = useState([]);
const [content, setContent] = useState('');
const dispatch = useDispatch();

useEffect(() => {                                                                  
  getUpcommingFlix(dispatch, currPage).then((resp) => { getUpcommingFlix(JSON.parse(resp)) });                                         
}, []);

useEffect(() => {
  if (status === STATUS.FINISHED) {
    setContent(upcommingFlix.results[0].title);
  } // eslint-disable-next-line
}, [upcommingFlix]);

***************************************************************************************/
export async function getUpcommingFlix(dispatch, page) {
  let option = '';
  dispatch(loadAnimAction.increase());

  if (!isNaN(page)) {
    option = '&page=' + page;
  }

  try {
    let resp = await fetch(url1 + 'movie/upcoming?' + apiKey1Lang + option);
    let data = await resp.json();
    let temp = await JSON.stringify(data);

    dispatch(loadAnimAction.decrease());
    dispatch(loadAnimAction.wait());
    return temp;
  }
  catch (error) {
    dispatch(loadAnimAction.fail());
    console.log(error);
    return false;
  }
}

/**************************************************************************************/
/*                             searchFlix() - Async                                   */
/*  Parameters: (search String, multi Bool, page Int)                                 */
/*         search: the string to search for                                           */
/*         multi: if false it will only search for movies                             */
/*                if true it will search for movies, tv shows and actors              */
/*         page: the number of the page                                               */
/*                                                                                    */
/*  Returns a list of movies (20/page) matching a searchcriteria from db as JSON      */
/*                                                                                    */
/*  JSON format: {"page": Int, "total_pages": Int, "total_results": Int,              */
/*                  "results": [                                                      */
/*                      "id": Int,                                                    */
/*                      "title": String,                                              */
/*                      "original_title": String,                                     */
/*                      "original_language": String,                                  */
/*                      "overview": String,                                           */
/*                      "poster_path": String,                                        */
/*                      "release_date": Date,                                         */
/*                      "popularity": Int,                                            */
/*                      "vote_average": Float,                                        */
/*                      "vote_count": Int,                                            */
/*                      "video": Bool,                                                */
/*                      "adult": Bool,                                                */
/*                      "backdrop_path": String,                                      */
/*                      "media_type": String,                                         */
/*                      "genre_ids": [Int, Int, Int]                                  */
/*                  ]                                                                 */
/*               }                                                                    */
/*  Usage:                                                                            */
/*                                                                                    */
/*                                                                                    */
/* import { searchFlix } from "./Features/repositoryAPI";                             */
/* ...                                                                                */
/* let myArray = '';                                                                  */
/* let search = 'star wars';                                                          */
/* let multi = false;                                                                 */
/* let currPage = 1;                                                                  */
/* searchFlix(search, multi, currPage).then((r) => { myArray = JSON.parse(r) });      */
/* let content = <div> myArray.results[i].title </div>                                */
/* ...                                                                                */
/**************************************************************************************/
export async function searchFlix(search, multi, page) {
  let parametersOk = true;
  let options = 'search/multi?' + apiKey1Lang;

  if (!multi) {
    options = 'search/movie?' + apiKey1Lang;
  }

  if (search === '' && search.length < 2) {
    parametersOk = false;
  } else {
    options += '&query=' + search;
  }

  if (isNaN(page)) {
    options += '&page=1';
  } else {
    options += '&page=' + page;
  }

  if (parametersOk) {
    try {
      let resp = await fetch(url1 + options);
      let data = await resp.json();

      return JSON.stringify(data);
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
}

/**************************************************************************************/
/*                           getFlixDetail() - Async                                  */
/*  Parameters: (id Int)                                                              */
/*         id: The tmdb id for that perticular movie.                                 */
/*                                                                                    */
/*  Returns a detail list of a movie matching the id from themoviedb.org as JSON      */
/*                                                                                    */
/*  JSON format: {"page": Int, "total_pages": Int, "total_results": Int,              */
/*                  "results": [                                                      */
/*                      "id": Int,                                                    */
/*                      "imdb_id": String,      (ex "tt0133093")                      */
/*                      "title": String,                                              */
/*                      "original_title": String,                                     */
/*                      "original_language": String,                                  */
/*                      "overview": String,                                           */
/*                      "poster_path": String,                                        */
/*                      "release_date": Date,                                         */
/*                      "status": String,                                             */
/*                      "popularity": Int,                                            */
/*                      "vote_average": Float,                                        */
/*                      "vote_count": Int,                                            */
/*                      "video": Bool,                                                */
/*                      "adult": Bool,                                                */
/*                      "backdrop_path": String,                                      */
/*                      "budget": Int,                                                */
/*                      "revenue": Int,                                               */
/*                      "homepage": String,                                           */
/*                      "runtime": Int,                                               */
/*                      "tagline": String,                                            */
/*                      "genre_ids": [Int, Int, Int]                                  */
/*                      "belongs_to_collection": [                                    */
/*                          "id": Int,                                                */
/*                          "name": String,                                           */
/*                          "poster_path": String,                                    */
/*                          "backdrop_path": String                                   */
/*                       ]                                                            */
/*                      "production_companies": [                                     */
/*                          "id": Int,                                                */
/*                          "name": String,                                           */
/*                          "logo_path": String,                                      */
/*                          "origin_country": String                                  */
/*                       ]                                                            */
/*                      "production_countries": [                                     */
/*                          "iso_3166_1": String,                                     */
/*                          "name": String                                            */
/*                       ]                                                            */
/*                      "spoken_languages": [                                         */
/*                          "english_name": String,                                   */
/*                          "iso_3166_1": String,                                     */
/*                          "name": String                                            */
/*                       ]                                                            */
/*                  ]                                                                 */
/*               }                                                                    */
/*                                                                                    */
/*  Usage:                                                                            */
/*                                                                                    */
/* import { getFlixDetail } from "./Features/repositoryAPI";                          */
/* ...                                                                                */
/* let myArray = '';                                                                  */
/* let id = 603;                                                                      */
/* getFlixDetail(id).then((resp) => { myArray = JSON.parse(resp) });                  */
/* let content = <div> myArray.title </div>                                           */
/* ...                                                                                */
/**************************************************************************************/
export async function getFlixDetail(id) {
  if (!isNaN(id)) {

    let options = 'movie/' + id + '?' + apiKey1Lang;

    try {
      let resp = await fetch(url1 + options);
      let data = await resp.json();

      return JSON.stringify(data);
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
}

