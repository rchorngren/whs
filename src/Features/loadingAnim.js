/**************************************************************************************/
/*                               loadingAnim.js                                       */
/*                                                                                    */
/*  A status to check if async api call is running                                    */
/*                                                                                    */
/**************************************************************************************/
import { createAction, createReducer } from "@reduxjs/toolkit";

const loading = createAction('loading'); 
const notLoading = createAction('not loading'); 

const actions = { loading, notLoading };

const STATUS = {
    LOADING: 'loading',
    NOTLOADING: 'not loading'
};

const initialState = {
    status: STATUS.NOTLOADING
};

const reducer = createReducer(initialState, {
    [loading]: (state, action) => ({
        ...state,
        status: STATUS.LOADING
    }),
    [notLoading]: (state, action) => ({
        ...state,
        status: STATUS.NOTLOADING
    }),
});

export { actions, STATUS, reducer };