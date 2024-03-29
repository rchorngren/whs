/**************************************************************************************/
/*                             repositoryAPI.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from movie APIs.             */
/**************************************************************************************/
import { actions as genresListOfAction } from './genresListOf';
import { actions as loadAnimAction } from './loadingAnim';

const url1 = 'https://api.themoviedb.org/3/';
const apiKey1Lang = 'api_key=4b112e5196b1623d24a8585c80c32de0&language=en-US';

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
/*  profileSmall: Small sized people image                                            */
/*  profileMedium: Medium sized people image                                          */
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
    sessionStorage.setItem('profileSmall', data.images.secure_base_url + data.images.profile_sizes[0]);
    sessionStorage.setItem('profileMedium', data.images.secure_base_url + data.images.profile_sizes[1]);
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
/*  Usage: See Globalg states (variables)                                              */
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
/*         search String: the string to search for                                    */
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
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Test = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [genreMovieList, setGenreMovieList] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let genreId = 28;

    useEffect(() => {
        getGenreMovieList(dispatch, genreId, currPage).then((resp) => {
            setGenreMovieList(JSON.parse(resp));
        }); // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            setContent(genreMovieList.results[0].title);
        } // eslint-disable-next-line 
    }, [genreMovieList]);

    return (
        <div>
            {content}
        </div>
    );
}

export default Test;

***************************************************************************************/
export async function getGenreMovieList(dispatch, genreId, page) {
  let date = formatDate(Date());
  let options = '&with_genres=' + genreId + '&sort_by=popularity.desc&vote_count.gte=100&page=' + page;
  options += '&release_date.lte=' + date;
  dispatch(loadAnimAction.increase());

  try {
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    dispatch(loadAnimAction.decrease());
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
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Test = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [sortedFlix, setSortedFlix] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let searchStr = 'recommended'; 

    useEffect(() => {
        getSortedFlix(dispatch, searchStr, currPage).then((resp) => {
            setSortedFlix(JSON.parse(resp));
        }); // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            setContent(sortedFlix.results[0].title);
        } // eslint-disable-next-line 
    }, [sortedFlix]);

    return (
        <div>
            {content}
        </div>
    );
}

export default Test;

***************************************************************************************/
export async function getSortedFlix(dispatch, search, page) {
  let date = formatDate(Date());
  let options = '&release_date.lte=' + date;
  dispatch(loadAnimAction.increase());

  if (search.toLowerCase() === 'recommended') {
    options += '&sort_by=vote_average.desc&vote_count.gte=3000&page=' + page;
  } else if (search.toLowerCase() === 'new') {
    options += '&sort_by=release_date.desc&page=' + page;
  } else {
    options += '&sort_by=popularity.desc&page=' + page;
  }
 
  try {
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    dispatch(loadAnimAction.decrease());
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
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Test = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [upcommingFlix, setUpcommingFlix] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getUpcommingFlix(dispatch, currPage).then((resp) => {
            setUpcommingFlix(JSON.parse(resp));
        }); // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            setContent(upcommingFlix.results[0].title);
        } // eslint-disable-next-line 
    }, [upcommingFlix]);

    return (
        <div>
            {content}
        </div>
    );
}

export default Test;

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

    dispatch(loadAnimAction.decrease());
    return JSON.stringify(data);
  }
  catch (error) {
    dispatch(loadAnimAction.fail());
    console.log(error);
    return false;
  }
}

/**************************************************************************************/
/*                             searchFlix() - Async                                   */
/*  Parameters: (dispatch, search String, multi Bool, page Int)                       */
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
/*  Usage:

import { searchFlix } from "../../Features/repositoryAPI";
import { STATUS } from '../../Features/loadingAnim';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Test = () => {
    const status = useSelector(state => state.loadingAnim.status);
    const [currPage, setCurrPage] = useState(1);
    const [foundFlix, setFoundFlix] = useState([]);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    let searchStr = 'Rocky'; 

    useEffect(() => {
        searchFlix(dispatch, searchStr, false, currPage).then((resp) => {
            setFoundFlix(JSON.parse(resp));
        }); // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (status === STATUS.FINISHED) {
            setContent(foundFlix.results[0].title);
        } // eslint-disable-next-line 
    }, [foundFlix]);

    return (
        <div>
            {content}
        </div>
    );
}

export default Test;

***************************************************************************************/
export async function searchFlix(dispatch, search, multi, page) {
  let parametersOk = true;
  let options = 'search/multi?' + apiKey1Lang;

  if (!multi) {
    options = 'search/movie?' + apiKey1Lang;
  }

  if (search === '' || search.length < 2 ) {
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
    dispatch(loadAnimAction.increase());

    try {
      let resp = await fetch(url1 + options);
      let data = await resp.json();

      for (let i=0; i < data.results.length; i++){
        if (data.results[i].gender !== undefined){
          data.results[i].title = data.results[i].name;
          data.results[i].overview = 'Known for: ' + data.results[i].known_for_department;

          const r = await fetch(url1 + 'person/' + data.results[i].id + '?' + apiKey1Lang);
          const d = await r.json();
          
          if (d.birthday === null){
            data.results[i].title = '';
          } else {
            data.results[i].poster_path = d.profile_path;
          }
        }
      }
      data.results = data.results.filter((entry) => {
        return entry.title !== ''
      }); 

      dispatch(loadAnimAction.decrease());
      return JSON.stringify(data);
    }
    catch (error) {
      dispatch(loadAnimAction.fail());
      console.log(error);
      return false;
    }
  }
}

/**************************************************************************************/
/*                           getFlixDetail() - Async                                  */
/*  Parameters: (dispatch, id Int)                                                    */
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
/*  Usage:

import { getFlixDetail } from "../../Features/repositoryAPI";    
import { useDispatch, useSelector } from 'react-redux';                            
import { STATUS } from '../../Features/loadingAnim';                               
import { useEffect, useState } from 'react';

const Test = () => {
  const status = useSelector(state => state.loadingAnim.status);
  const [currPage, setCurrPage] = useState(1);                                                                 
  const [flixDetail, setFlixDetail] = useState([]);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  let id = 603;

  useEffect(() => {                                                                  
    getFlixDetail(dispatch, id).then((resp) => { setFlixDetail(JSON.parse(resp)) });                                         
  }, []);

  useEffect(() => {
    if (status === STATUS.FINISHED) {
      setContent(flixDetail.results[0].title);
    } // eslint-disable-next-line
  }, [searchFlix]);

  return (
      <div>
          {content}
      </div>
  );
}

export default Test;

***************************************************************************************/
export async function getFlixDetail(dispatch, id) {
  if (!isNaN(id)) {

    let options = 'movie/' + id + '?' + apiKey1Lang;
    dispatch(loadAnimAction.increase());

    try {
      let resp = await fetch(url1 + options);
      let data = await resp.json();

      dispatch(loadAnimAction.decrease());
      return JSON.stringify(data);
    }
    catch (error) {
      dispatch(loadAnimAction.fail());
      console.log(error);
      return false;
    }
  }
}

/**************************************************************************************/
/*                         getPersonDetail() - Async                                  */
/*  Parameters: (dispatch, id Int, page Int)                                          */
/*         id: The tmdb id for that perticular person.                                */
/*         page: the number of the page                                               */
/*                                                                                    */
/*  Returns a detail list of a person matching the id from themoviedb.org as JSON     */
/*                                                                                    */
/*  JSON format: {"id": Int,                                                          */
/*                "name": String,                                                     */
/*                "adult": Bool,                                                      */
/*                "also_known_as": [String, String, String],                          */
/*                "biography": String,                                                */
/*                "birthday": YYYY-MM-DD,                                             */
/*                "deathday": YYYY-MM-DD, //null if still alive                       */
/*                "gender": Int,  //0 - female 2 - male                               */
/*                "homepage": String                                                  */
/*                "imdb_id": String,      (ex "tt0133093")                            */
/*                "known_for_department": String,                                     */
/*                "place_of_birth": String,                                           */
/*                "popularity": Int,                                                  */
/*                "profile_path": String,                                             */
/*                "page": Int,                                                        */
/*                "total_pages": Int,                                                 */
/*                "results": [                                                        */
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
/*                                                                                    */
/*  Usage:

import { getPersonDetail } from "../../Features/repositoryAPI";    
import { useDispatch, useSelector } from 'react-redux';                            
import { STATUS } from '../../Features/loadingAnim';                               
import { useEffect, useState } from 'react';

const Test = () => {
  const status = useSelector(state => state.loadingAnim.status);
  const [currPage, setCurrPage] = useState(1);                                                                 
  const [personDetail, setPersonDetail] = useState([]);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  let id = 1331;

  useEffect(() => {                                                                  
    getPersonDetail(dispatch, id, currPage).then((resp) => { setPersonDetail(JSON.parse(resp)) });                                         
  }, []);

  useEffect(() => {
    if (status === STATUS.FINISHED) {
      setContent(personDetail.name);
    } // eslint-disable-next-line
  }, [personDetail]);

  return (
      <div>
          {content}
      </div>
  );
}

export default Test;

***************************************************************************************/
export async function getPersonDetail(dispatch, id, page) {
  if (!isNaN(id)) {

    let options = 'person/' + id + '?' + apiKey1Lang;
    dispatch(loadAnimAction.increase());

    try {
      let resp = await fetch(url1 + options);
      let data = await resp.json();

      let r = await fetch(url1 + 'discover/movie?' + apiKey1Lang + '&with_cast=' + id + '&page=' + page);
      let d = await r.json();

      data['results'] = d.results;
      data.page = d.page;
      data.total_pages = d.total_pages;

      dispatch(loadAnimAction.decrease());
      return JSON.stringify(data);
    }
    catch (error) {
      dispatch(loadAnimAction.fail());
      console.log(error);
      return false;
    }
  }
}

/**************************************************************************************/
/*                     returns a date in YYYY-MM-DD format                            */
/**************************************************************************************/
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}