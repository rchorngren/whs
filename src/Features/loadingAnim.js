/**************************************************************************************/
/*                               loadingAnim.js                                       */
/*                                                                                    */
/*  A status to check if async api call is running                                    */
/*                                                                                    */
/**************************************************************************************/
import { createAction, createReducer } from "@reduxjs/toolkit";

const loading = createAction('loading');
const notLoading = createAction('not loading');
const increase = createAction('increase');
const decrease = createAction('decrease');
const wait = createAction('wait');
const fail = createAction('fail');

const actions = { loading, notLoading, increase, decrease, wait, fail };

const STATUS = {
    WAITING: 'waiting',
    LOADING: 'loading',
    FINISHED: 'finished',
    FAILED: 'failed'
};

const initialState = {
    status: STATUS.WAITING,
    count: 0
};

const reducer = createReducer(initialState, {
    [fail]: (state, action) => ({
        status: STATUS.FAILED,
        count: 0
    }),
    [wait]: (state, action) => {
        if (state.count > 0) {
            return {
                ...state,
                status: STATUS.LOADING
            }
        } else {
            return {
                status: STATUS.WAITING,
                count: 0
            }
        }
    },
    [loading]: (state, action) => ({
        ...state,
        status: STATUS.LOADING
    }),
    [notLoading]: (state, action) => ({
        ...state,
        status: STATUS.FINISHED
    }),
    [increase]: (state, action) => ({
        status: STATUS.LOADING,
        count: (state.count + 1)
    }),
    [decrease]: (state, action) => {
        if (state.count > 1) {
            return {
                status: STATUS.LOADING,
                count: state.count - 1
            }
        } else {
            return {
                status: STATUS.FINISHED,
                count: 0
            }
        }
    },
});

export { actions, STATUS, reducer };