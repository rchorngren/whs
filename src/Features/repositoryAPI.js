/*********************************************************************************/
/*                             repositoryAPI.js                                  */
/*                                                                               */
/*  A collenction  of useful functionen used to get data from movie APIs.        */
/*********************************************************************************/


/*********************************************************************************/
/*                             getGenre() - Async                                */
/*                                                                               */
/*  Returns a list of genre from themoviedb.org as JSON                          */
/*  JSON format: {"genres": [{ "id": Int, "name": String}]}                      */
/*                                                                               */
/*  Usage:                                                                       */
/*        import { getGenre } from "./Features/repositoryAPI";                   */
/*        ...                                                                    */
/*        let myArray = '';                                                      */
/*        getGenre().then((resp) => { myArray = JSON.parse(resp) });             */
/*        ...                                                                    */
/*********************************************************************************/
export async function getGenre() {
    try {
        let resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4b112e5196b1623d24a8585c80c32de0&language=en-U');
        let data = await resp.json();
    
        return JSON.stringify(data);
      }
      catch (error) {
        console.log(error);
        return false;
      }
}