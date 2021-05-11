/**************************************************************************************/
/*                             repositoryAPI.js                                       */
/*                                                                                    */
/*  A collenction  of useful functionen used to get data from movie APIs.             */
/**************************************************************************************/
const url1 = 'https://api.themoviedb.org/3/';
const apiKey1Lang = 'api_key=4b112e5196b1623d24a8585c80c32de0&language=en-U';

/**************************************************************************************/
/*                             getGenre() - Async                                     */
/*                                                                                    */
/*  Returns a list of genre from themoviedb.org as JSON                               */
/*  JSON format: {"genres": [{ "id": Int, "name": String}]}                           */
/*                                                                                    */
/*  Usage:                                                                            */
/*        import { getGenre } from "./Features/repositoryAPI";                        */
/*        ...                                                                         */
/*        let myArray = '';                                                           */
/*        getGenre().then((resp) => { myArray = JSON.parse(resp) });                  */
/*        ...                                                                         */
/**************************************************************************************/
export async function getGenre() {
    try {
        let resp = await fetch(url1 + 'genre/movie/list?' + apiKey1Lang);
        let data = await resp.json();
    
        return JSON.stringify(data);
      }
      catch (error) {
        console.log(error);
        return false;
      }
}

/**************************************************************************************/
/*                             getGenreList() - Async                                 */
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
/* import { getGenreList } from "./Features/repositoryAPI";                           */
/* ...                                                                                */
/* let myArray = '';                                                                  */
/* let genreId = 27;                                                                  */
/* let currentPage = 1;                                                               */
/* getGenreList(genreId, currentPage).then((resp) => { myArray = JSON.parse(resp) }); */
/* ...                                                                                */
/**************************************************************************************/
export async function getGenreList(genreId, page) {
  let options = '&with_genres=' + genreId + '&sort_by=popularity.desc&page=' + page;
  try {
    console.log(url1 + 'discover/movie?' + apiKey1Lang + options);
    let resp = await fetch(url1 + 'discover/movie?' + apiKey1Lang + options);
    let data = await resp.json();

    return JSON.stringify(data);
  }
  catch (error) {
    console.log(error);
    return false;
  }
}