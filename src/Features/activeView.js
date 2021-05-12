import { createAction, createReducer } from "@reduxjs/toolkit"

const empty = createAction('empty');
const checkout = createAction('checkout view');
const profile = createAction('profile view');
const login = createAction('login view');
const menu = createAction('menu view');

const actions = {
    empty,
    checkout,
    profile,
    login,
    menu
}

const ACTIVEVIEW = {
    DEFAULT: 'default',
    CHECKOUT: 'checkout',
    PROFILE: 'profile',
    LOGIN: 'login',
    MENU: 'menu'
}

const initialState = {
    activeView: ACTIVEVIEW.DEFAULT
}

const reducer = createReducer(initialState, {
    [empty]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.DEFAULT
    }),
    [checkout]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.CHECKOUT
    }),
    [profile]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.PROFILE
    }),
    [login]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.LOGIN
    }),
    [menu]: (state, action) => ({
        ...state,
        activeView: ACTIVEVIEW.MENU
    }),
});

export { actions, reducer, ACTIVEVIEW };