import { createAction, createReducer } from "@reduxjs/toolkit";

const loggedin = createAction('loggedin');

const actions = {
    loggedin
}

const LOGGEDINUSER = {
    DEFAULT: false,
    LOGGEDIN: true
}

const initialState = {
    loggedinUser: LOGGEDINUSER.DEFAULT
}

const reducer = createReducer(initialState, {
    [loggedin]: (state, action) => ({
        ...state,
        loggedinUser: LOGGEDINUSER.LOGGEDIN
    })
});

export { actions, reducer, LOGGEDINUSER };