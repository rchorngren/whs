/**************************************************************************************/
/*                               genresListOf.js                                      */
/*                                                                                    */
/*  Global state (variable) - list of genre from themoviedb.org                       */
/*  JSON format: {"genres": [{ "id": Int, "name": String}]}                           */
/*                                                                                    */
/*  Usage:                                                                            */
/*        import { useSelector } from 'react-redux';                                  */
/*        import { STATUS } from '../Features/genresListOf';                          */
/*        ...                                                                         */
/*        let myArray = null;                                                         */
/*        if (status === STATUS.SUCCESS) {                                            */
/*           myArray = JSON.parse(useSelector(state => state.genresListOf.list));     */
/*        }                                                                           */
/*        let content = <div> myArray.genres[i].name </div>                           */
/*        ...                                                                         */
/**************************************************************************************/
import { createAction, createReducer } from "@reduxjs/toolkit";

const isFetching = createAction('is fetching'); 
const success = createAction('success'); 
const failure = createAction('failure');

const actions = { isFetching, success, failure };

const STATUS = {
    NORMAL: 'normal',
    FETCHING: 'is fetching',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

const initialState = {
    status: STATUS.NORMAL,
    list: null
};

const reducer = createReducer(initialState, {
    [isFetching]: (state, action) => ({
        ...state,
        status: STATUS.FETCHING
    }),
    [success]: (state, action) => ({
        status: STATUS.SUCCESS,
        list: action.payload
    }),
    [failure]: (state, action) => ({
        ...state,
        status: STATUS.FAILURE
    }),
});

export { actions, STATUS, reducer };