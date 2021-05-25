import { createAction, createReducer } from "@reduxjs/toolkit";

const loggedin = createAction('loggedin');
const loggedout = createAction('loggedout');

const actions = {
    loggedin,
    loggedout
}

const LOGGEDINUSER = {
    DEFAULT: false,
    LOGGEDIN: true,
    // LOGGEDOUT: false
}

const initialState = {
    loggedinUser: LOGGEDINUSER.DEFAULT
}

const reducer = createReducer(initialState, {
    [loggedin]: (state, action) => ({
        ...state,
        loggedinUser: LOGGEDINUSER.LOGGEDIN
    }),
    [loggedout]: (state, action) => ({
        ...state,
        loggedinUser: LOGGEDINUSER.DEFAULT
    })
});

export { actions, reducer, LOGGEDINUSER };