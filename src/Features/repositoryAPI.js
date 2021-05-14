/**************************************************************************************/
/*                             repositoryAPI.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from movie APIs.             */
/**************************************************************************************/
import { actions as genresListOfAction } from './genresListOf';

const url1 = 'https://api.themoviedb.org/3/';
const apiKey1Lang = 'api_key=4b112e5196b1623d24a8585c80c32de0&language=en-U';

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
/*  Usage:                                                                            */
/*                                                                                    */
/* import { getGenreMovieList } from "./Features/repositoryAPI";                      */
/* ...                                                                                */
/* let myArray = '';                                                                  */
/* let genreId = 27;                                                                  */
/* let currentPage = 1;                                                               */
/* getGenreMovieList(genreId, currentPage).then((r) => { myArray = JSON.parse(r) });  */
/* let content = <div> myArray.genres[i].title </div>                                 */
/* ...                                                                                */
/**************************************************************************************/
export async function getGenreMovieList(genreId, page) {
  let options = '&with_genres=' + genreId + '&sort_by=popularity.desc&page=' + page;
  try {
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    return JSON.stringify(data);
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

/**************************************************************************************/
/*                            getSortedFlix() - Async                                 */
/*                                                                                    */
/*  Returns a list of movies (20/page) matching a searchcriteria from db as JSON      */
/*  Parameters: (search String, multi Bool, page Int)                                 */
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
/*  Usage:                                                                            */
/*                                                                                    */
/* import { getSortedFlix } from "./Features/repositoryAPI";                          */
/* ...                                                                                */
/* let myArray = '';                                                                  */
/* let search = 'popularity'; //'popularity' is defalt, other: 'recommended' or 'new' */
/* let currPage = 1;                                                                  */
/* getSortedFlix(search, currPage).then((resp) => { myArray = JSON.parse(resp) });    */
/* let content = <div> myArray.results[i].title </div>                                */
/* ...                                                                                */
/**************************************************************************************/
export async function getSortedFlix(search, page) {
  let options = '';

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

    return JSON.stringify(data);
  }
  catch (error) {
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

