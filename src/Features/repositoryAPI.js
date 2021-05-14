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
/* let dispatch = null;                                                               */
/* let search = 'popularity'; //'popularity' is defalt, other: 'recommended' or 'new' */
/* let currPage = 1;                                                                  */
/* getSortedFlix(search, currPage).then((resp) => { myArray = JSON.parse(resp) });    */
/* let content = <div> myArray.genres[i].title </div>                                 */
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
/*                              getFromDb() - Async                                   */
/*                                                                                    */
/*  Send API question with parameter 'url' and return JSON                            */
/*                                                                                    */
/**************************************************************************************/
async function getFromDb(url) {
  try {
    let resp = await fetch(url);
    let data = await resp.json();

    return JSON.stringify(data);
  }
  catch (error) {
    console.log(error);
    return false;
  }
}